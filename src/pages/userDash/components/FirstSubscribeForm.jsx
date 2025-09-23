import React, { useMemo, useState } from 'react';
import { X, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { Field } from './NewRequestForm';

const CATEGORIES = [
  { value: 'etudiant', label: 'Étudiant' },
  { value: 'professionnel', label: 'Professionnel' },
  { value: 'refugie', label: 'Réfugié' },
  { value: 'touriste', label: 'Touriste' },
];

export default function FirstSubscribeForm({
  initialValues = {},
  onSubmit = async () => {},
  onCancel = () => {},
}) {
  const [values, setValues] = useState({
    nom: '',
    prenom: '',
    passeport: '',
    adresse: '',
    dateEntree: '',
    profession: '',
    categorie: 'etudiant',
    ...initialValues,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const dynFields = useMemo(() => {
    switch (values.categorie) {
      case 'etudiant':
        return [
          { name: 'etablissement', label: 'Établissement', type: 'text', required: true },
          { name: 'filiere', label: 'Filière', type: 'text', required: true },
          { name: 'niveau', label: "Niveau d'étude", type: 'text' },
          { name: 'cycle', label: 'Cycle', type: 'text' },
          { name: 'typeBourse', label: 'Type de bourse', type: 'text' },
        ];
      case 'professionnel':
        return [
          { name: 'entreprise', label: 'Entreprise', type: 'text', required: true },
          { name: 'poste', label: 'Poste', type: 'text' },
          { name: 'diplome', label: 'Diplôme', type: 'text' },
          { name: 'specialite', label: 'Spécialité', type: 'text' },
        ];
      case 'refugie':
        return [
          { name: 'statutAsile', label: "Statut d'asile", type: 'text', required: true },
          { name: 'numeroDossier', label: 'N° de dossier', type: 'text' },
          { name: 'organisation', label: "Organisation d'accompagnement", type: 'text' },
        ];
      case 'touriste':
        return [
          { name: 'motif', label: 'Motif de séjour', type: 'text', required: true },
          { name: 'dateArrivee', label: "Date d'arrivée", type: 'date' },
          { name: 'dateDepart', label: 'Date de départ', type: 'date' },
          { name: 'hebergement', label: 'Hébergement', type: 'text' },
        ];
      default:
        return [];
    }
  }, [values.categorie]);

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const req = ['nom', 'prenom', 'passeport', 'adresse', 'dateEntree', 'profession', 'categorie'];
    const next = {};
    req.forEach((k) => {
      if (!values[k]) next[k] = 'Champ requis';
    });
    dynFields.forEach((f) => {
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
      const res = onSubmit ? onSubmit(values) : undefined;
      if (res && typeof res.then === 'function') await res;
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
        <h3 className="text-lg font-semibold text-gray-900">Inscription créée</h3>
        <p className="text-sm text-gray-600 mt-1">Votre inscription a été enregistrée avec succès.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button type="button" className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700" onClick={onCancel}>
            Retour au profil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5 mb-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Première inscription</h3>
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
        {/* Base identity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Field label="Nom" required error={errors.nom}>
              <input
                type="text"
                value={values.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
              />
            </Field>
          </div>
          <div>
            <Field label="Prénom" required error={errors.prenom}>
              <input
                type="text"
                value={values.prenom}
                onChange={(e) => handleChange('prenom', e.target.value)}
                className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
              />
            </Field>
          </div>
          <div>
            <Field label="N° Passeport" required error={errors.passeport}>
              <input
                type="text"
                value={values.passeport}
                onChange={(e) => handleChange('passeport', e.target.value)}
                className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
              />
            </Field>
          </div>
          <div>
            <Field label="Adresse" required error={errors.adresse}>
              <input
                type="text"
                value={values.adresse}
                onChange={(e) => handleChange('adresse', e.target.value)}
                className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
              />
            </Field>
          </div>
          <div>
            <Field label="Date d'entrée" required error={errors.dateEntree}>
              <input
                type="date"
                value={values.dateEntree}
                onChange={(e) => handleChange('dateEntree', e.target.value)}
                className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
              />
            </Field>
          </div>
          <div>
            <Field label="Profession" required error={errors.profession}>
              <input
                type="text"
                value={values.profession}
                onChange={(e) => handleChange('profession', e.target.value)}
                className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
              />
            </Field>
          </div>
        </div>

        {/* Category select */}
        <Field label="Catégorie" required error={errors.categorie}>
          <select
            value={values.categorie}
            onChange={(e) => handleChange('categorie', e.target.value)}
            className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </Field>

        {/* Dynamic fields by category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dynFields.map((f) => (
            <div key={f.name}>
              <Field label={f.label} required={f.required} error={errors[f.name]}>
                <input
                  type={f.type}
                  value={values[f.name] || ''}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  className="w-full rounded-sm border focus:ring-emerald-500 focus:border-emerald-500 p-2 bg-white"
                />
              </Field>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button type="button" onClick={onCancel} className="px-3 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50" disabled={submitting}>
            Annuler
          </button>
          <button type="submit" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60" disabled={submitting}>
            <Save className="h-4 w-4" /> {submitting ? 'Enregistrement...' : 'S\'inscrire'}
          </button>
        </div>
      </form>
    </div>
  );
}
