import React, { useState } from 'react';
import TopBar from '../../shared/TopBar';
import Navbar from '../../shared/Navbar';
import SharedNavBanner from '../../shared/SharedNavBanner';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [lang, setLang] = useState('FR');
  const [section, setSection] = useState('Login');
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (mode === 'login') {
      if (!form.email) e.email = "L'email est requis";
      if (!form.password) e.password = 'Le mot de passe est requis';
    } else {
      if (!form.firstName) e.firstName = 'Le prénom est requis';
      if (!form.lastName) e.lastName = 'Le nom est requis';
      if (!form.email) e.email = "L'email est requis";
      if (!form.confirmEmail) e.confirmEmail = "Confirmez l'email";
      if (form.email && form.confirmEmail && form.email !== form.confirmEmail) {
        e.confirmEmail = 'Les emails ne correspondent pas';
      }
      if (!form.password) e.password = 'Le mot de passe est requis';
      if (!form.confirmPassword) e.confirmPassword = 'Confirmez le mot de passe';
      if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
        e.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (mode === 'login') {
        // TODO: Replace with real API call
        // await api.login({ email: form.email, password: form.password })
        console.log('Login payload', { email: form.email, password: form.password });
        navigate('/dash');
      } else {
        // TODO: Replace with real API call
        // await api.register({ firstName, lastName, email, password })
        console.log('Register payload', {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        });
        alert("Inscription réussie (simulation)");
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar currentLang={lang} onLanguageChange={setLang} />
      <Navbar current={section} onSelect={setSection} />

      <SharedNavBanner
        title={mode === 'login' ? 'Connexion' : 'Inscription'}
        description={mode === 'login' ? 'Accédez à votre espace utilisateur' : 'Créez votre compte en quelques étapes'}
      />

      <main className="flex-1">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
            {/* Toggle login/register */}
            <div className="flex items-center justify-center mb-6">
              <h2
                className="px-4 py-2 rounded-md text-sm font-medium  bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              >
                {mode === 'login' ? "Connexion" : 'Inscription'}
              </h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {mode === 'register' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={onChange}
                        className={`mt-1 block w-full rounded-sm border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500 focus:ring-emerald-500`}
                        placeholder="Votre prénom"
                      />
                      {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={onChange}
                        className={`mt-1 block w-full rounded-sm border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500 focus:ring-emerald-500`}
                        placeholder="Votre nom"
                      />
                      {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      className={`mt-1 block w-full rounded-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500 focus:ring-emerald-500`}
                      placeholder="vous@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">Confirmer email</label>
                    <input
                      id="confirmEmail"
                      name="confirmEmail"
                      type="email"
                      value={form.confirmEmail}
                      onChange={onChange}
                      className={`mt-1 block w-full rounded-sm border ${errors.confirmEmail ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500 focus:ring-emerald-500`}
                      placeholder="vous@example.com"
                    />
                    {errors.confirmEmail && <p className="mt-1 text-xs text-red-600">{errors.confirmEmail}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChange}
                        className={`mt-1 block w-full rounded-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500 focus:ring-emerald-500`}
                        placeholder="••••••••"
                      />
                      {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer mot de passe</label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={onChange}
                        className={`mt-1 block w-full rounded-sm border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500 focus:ring-emerald-500`}
                        placeholder="••••••••"
                      />
                      {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </>
              )}

              {mode === 'login' && (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      className={`mt-1 block w-full rounded-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500 focus:ring-emerald-500`}
                      placeholder="vous@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={onChange}
                      className={`mt-1 block w-full rounded-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500 focus:ring-emerald-500`}
                      placeholder="••••••••"
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex justify-center items-center rounded-md bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
              >
                {submitting ? 'Veuillez patienter...' : (mode === 'login' ? 'Se connecter' : "S'inscrire")}
              </button>

              <p className="text-center text-sm text-gray-600">
                {mode === 'login' ? (
                  <>
                    Pas de compte ?{' '}
                    <button type="button" onClick={() => setMode('register')} className="text-emerald-700 hover:underline">Créer un compte</button>
                  </>
                ) : (
                  <>
                    Déjà un compte ?{' '}
                    <button type="button" onClick={() => setMode('login')} className="text-emerald-700 hover:underline">Se connecter</button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-sm text-gray-500">
        {new Date().getFullYear()} Ambassade du Niger
      </footer>
    </div>
  );
}
