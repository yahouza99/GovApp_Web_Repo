import React, { useMemo, useState } from 'react';
import { X, Save, CheckCircle2, AlertCircle } from 'lucide-react';

// Types de demande disponibles
const TYPES = [
  { value: 'carte_consulaire', label: 'Carte consulaire' },
  { value: 'prise_en_charge', label: 'Prise en charge' },
  { value: 'rapatriement', label: 'Rapatriement' },
];

// Composant Field calqué sur le style de AppointmentForm
export function Field({ label, required, error, hint, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </span>
      <div className="mt-1">{children}</div>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </label>
  );
}

export default function NewRequestForm({ initialType = 'carte_consulaire', onSubmit = async () => {}, onCancel = () => {} }) {
  const [type, setType] = useState(initialType);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const fields = useMemo(() => {
    switch (type) {
      case 'carte_consulaire':
        return [
          { name: 'motif', label: 'Motif', type: 'text', required: true },
          { name: 'validite', label: 'Validité souhaitée', type: 'text' },
          { name: 'adresse', label: 'Adresse', type: 'text', required: true },
          { name: 'piece_jointe', label: 'Pièce jointe (PDF)', type: 'file', accept: 'application/pdf' },
        ];
      case 'prise_en_charge':
        return [
          { name: 'beneficiaire', label: 'Bénéficiaire', type: 'text', required: true },
          { name: 'organisme', label: 'Organisme', type: 'text' },
          { name: 'periode', label: 'Période', type: 'text' },
          { name: 'montant', label: 'Montant estimé', type: 'number', step: '0.01' },
          { name: 'piece_jointe', label: 'Pièce jointe (PDF)', type: 'file', accept: 'application/pdf' },
        ];
      case 'rapatriement':
        return [
          { name: 'personne', label: 'Personne à rapatrier', type: 'text', required: true },
          { name: 'depart', label: 'Lieu de départ', type: 'text', required: true },
          { name: 'destination', label: 'Destination', type: 'text', required: true },
          { name: 'date', label: 'Date souhaitée', type: 'date' },
          {
            name: 'urgence',
            label: "Niveau d'urgence",
            type: 'select',
            options: [
              { value: 'faible', label: 'Faible' },
              { value: 'moyenne', label: 'Moyenne' },
              { value: 'elevee', label: 'Élevée' },
            ],
          },
          { name: 'piece_jointe', label: 'Pièce jointe (PDF)', type: 'file', accept: 'application/pdf' },
        ];
      default:
        return [];
    }
  }, [type]);

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleFile = (name, file) => {
    setValues((v) => ({ ...v, [name]: file }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    fields.forEach((f) => {
      if (f.required && !values[f.name]) next[f.name] = 'Champ requis';
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setStatus('idle');
      setErrorMsg('');
      const payload = { type, ...values };
      const res = onSubmit ? onSubmit(payload) : undefined;
      if (res && typeof res.then === 'function') {
        await res;
      }
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
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Demande enregistrée</h3>
        <p className="text-sm text-gray-600 mt-1">Votre demande a été créée avec succès.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={onCancel}
          >
            Retour aux demandes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Nouvelle demande</h3>
        </div>
        <button type="button" onClick={onCancel} className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-white border border-gray-200 hover:bg-gray-50">
          <X className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {status === 'error' && (
        <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 text-rose-700 p-3 text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={submit} className="mt-4 space-y-4">
        <Field label="Type de demande" required>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-sm border  focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className="col-span-1">
              <Field label={f.label} required={f.required} error={errors[f.name]}>
                {f.type === 'select' ? (
                  <select
                    value={values[f.name] || ''}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                    className="w-full rounded-sm border  focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
                  >
                    <option value="">Choisir</option>
                    {f.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : f.type === 'file' ? (
                  <input
                    type="file"
                    accept={f.accept}
                    onChange={(e) => handleFile(f.name, e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-700 file:mr-3 file:px-3 file:py-2 file:rounded-sm file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-500"
                  />
                ) : (
                  <input
                    type={f.type}
                    step={f.step}
                    value={values[f.name] || ''}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                    className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
                  />
                )}
              </Field>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onCancel} className="px-3 py-2 rounded-sm border border-gray-200 text-gray-700 hover:bg-gray-50" disabled={submitting}>
            Annuler
          </button>
          <button type="submit" className="inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60" disabled={submitting}>
            <Save className="h-4 w-4" /> {submitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}
