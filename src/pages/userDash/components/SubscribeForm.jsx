import React, { useMemo, useState } from 'react';
import { X, Save, CheckCircle2 } from 'lucide-react';
import { Field } from './NewRequestForm';

export default function SubscribeForm({
  categorie = 'etudiant', // 'etudiant' | 'professionnel' | 'touriste' | 'refugie'
  initialValues = {},
  onSubmit = async () => {},
  onCancel = () => {},
}) {
  const [values, setValues] = useState({ ...initialValues });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | success

  const fields = useMemo(() => {
    switch (categorie) {
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
      case 'touriste':
        return [
          { name: 'motif', label: 'Motif de séjour', type: 'text', required: true },
          { name: 'dateArrivee', label: "Date d'arrivée", type: 'date' },
          { name: 'dateDepart', label: 'Date de départ', type: 'date' },
          { name: 'hebergement', label: 'Hébergement', type: 'text' },
        ];
      case 'refugie':
        return [
          { name: 'statutAsile', label: "Statut d'asile", type: 'text', required: true },
          { name: 'numeroDossier', label: 'N° de dossier', type: 'text' },
          { name: 'organisation', label: "Organisation d'accompagnement", type: 'text' },
        ];
      default:
        return [];
    }
  }, [categorie]);

  const handleChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = onSubmit ? onSubmit({ categorie, ...values }) : undefined;
      if (res && typeof res.then === 'function') await res;
      setStatus('success');
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
        <h3 className="text-lg font-semibold text-gray-900">Inscription mise à jour</h3>
        <p className="text-sm text-gray-600 mt-1">Vos informations ont été enregistrées avec succès.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={onCancel}
          >
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
          <h3 className="text-lg font-semibold text-gray-900">Mettre à jour mon inscription</h3>
        </div>
        <button type="button" onClick={onCancel} className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-white border border-gray-200 hover:bg-gray-50">
          <X className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <form onSubmit={submit} className="mt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className="col-span-1">
              <Field label={f.label} required={f.required}>
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
            <Save className="h-4 w-4" /> {submitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}
