import React, { useMemo, useState } from 'react';
import SuccessAlert from '../../../shared/SuccessAlert';
import ErrorAlert from '../../../shared/ErrorAlert';

const SERVICES = [
  { value: 'consulat', label: 'Consulat' },
  { value: 'academic', label: 'Académique' },
  { value: 'embassy', label: 'Ambassade' },
];

const APPOINTMENT_TYPES = [
  { value: 'demande', label: 'Demande' },
  { value: 'renouvellement', label: 'Renouvellement' },
  { value: 'information', label: 'Information' },
  { value: 'autre', label: 'Autre' },
];

const DOCUMENT_TYPES = [
  { value: 'visa', label: 'Visa' },
  { value: 'passeport', label: 'Passeport' },
  { value: 'carte-consulaire', label: 'Carte consulaire' },
  { value: 'prise-en-charge', label: 'Prise en charge' },
  { value: 'laissez-passer', label: 'Laissez-passer' },
  { value: 'etat-civil', label: 'État civil' },
];

const CITIZENSHIP = [
  { value: 'nigerien', label: 'Nigérien' },
  { value: 'etranger', label: 'Étranger' },
];

const CITIZEN_TYPES = [
  { value: 'etudiant', label: 'Étudiant' },
  { value: 'professionnel', label: 'Professionnel' },
  { value: 'diplomate', label: 'Diplomate' },
  { value: 'refugie', label: 'Réfugié' },
  { value: 'diplomate-mission', label: 'Diplomate en mission' },
];

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}{required && <span className="text-red-600"> *</span>}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

export default function AppointmentForm({ onSubmit }) {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
    appointmentType: 'demande',
    service: 'consulat',
    documentType: 'visa',
    citizenship: 'nigerien',
    citizenType: 'etudiant',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const update = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.firstName) e.firstName = 'Prénom requis';
    if (!data.lastName) e.lastName = 'Nom requis';
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Email valide requis';
    if (!data.phone) e.phone = 'Téléphone requis';
    if (!data.date) e.date = 'Date requise';
    if (!data.time) e.time = 'Heure requise';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus('idle');
    setErrorMsg('');
    const payload = { ...data };
    try {
      const res = onSubmit ? onSubmit(payload) : undefined;
      if (res && typeof res.then === 'function') {
        await res;
      }
      // Success
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Une erreur est survenue lors de la soumission.');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="space-y-6">
        <SuccessAlert
          title="Demande envoyée"
          message="Votre demande de rendez-vous a été soumise. Vous recevrez une confirmation par e-mail."
          onClose={() => setStatus('idle')}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <ErrorAlert
          title="Échec de l'envoi"
          message={errorMsg}
          onClose={() => setStatus('idle')}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Prénom" required>
          <input type="text" value={data.firstName} onChange={update('firstName')} disabled={submitting} className={`w-full rounded-md border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60`} />
          {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
        </Field>
        <Field label="Nom" required>
          <input type="text" value={data.lastName} onChange={update('lastName')} disabled={submitting} className={`w-full rounded-md border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60`} />
          {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email" required>
          <input type="email" value={data.email} onChange={update('email')} disabled={submitting} className={`w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60`} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </Field>
        <Field label="Téléphone" required>
          <input type="tel" value={data.phone} onChange={update('phone')} disabled={submitting} className={`w-full rounded-md border ${errors.phone ? 'border-red-300' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60`} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Date" required>
          <input type="date" value={data.date} min={today} onChange={update('date')} disabled={submitting} className={`w-full rounded-md border ${errors.date ? 'border-red-300' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60`} />
          {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
        </Field>
        <Field label="Heure" required>
          <input type="time" value={data.time} onChange={update('time')} disabled={submitting} className={`w-full rounded-md border ${errors.time ? 'border-red-300' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60`} />
          {errors.time && <p className="mt-1 text-xs text-red-600">{errors.time}</p>}
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Type de rendez-vous" required>
          <select value={data.appointmentType} onChange={update('appointmentType')} disabled={submitting} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60">
            {APPOINTMENT_TYPES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Service" required>
          <select value={data.service} onChange={update('service')} disabled={submitting} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60">
            {SERVICES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Type de document" required>
          <select value={data.documentType} onChange={update('documentType')} disabled={submitting} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60">
            {DOCUMENT_TYPES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Type de citoyenneté" required>
          <select value={data.citizenship} onChange={update('citizenship')} disabled={submitting} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60">
            {CITIZENSHIP.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Type de citoyen" required>
          <select value={data.citizenType} onChange={update('citizenType')} disabled={submitting} className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60">
            {CITIZEN_TYPES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <div />
      </div>

      <Field label="Message / Détails" required={false}>
        <textarea rows={4} value={data.notes} onChange={update('notes')} disabled={submitting} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60" placeholder="Décrivez votre besoin..." />
      </Field>

      <div className="pt-2">
        <button type="submit" disabled={submitting} className="inline-flex items-center justify-center px-4 h-11 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60">
          {submitting ? 'Envoi...' : 'Envoyer la demande'}
        </button>
      </div>
    </form>
  );
}
