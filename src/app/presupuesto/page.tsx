// src/app/presupuesto/page.tsx
export default function PresupuestoPage() {
    return (
      <main className="min-h-screen bg-slate-900 text-white px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Necesitás un presupuesto?
            </h1>
            <p className="mt-3 text-sm text-slate-200 sm:text-base">
              Contanos qué tipo de trabajo necesitás y algunos detalles básicos. Mañana vamos
              a adaptar este formulario para que, según el tipo de trabajo, se muestren las
              preguntas específicas que el equipo de Magenta utiliza al cotizar.
            </p>
  
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://wa.me/59898273040"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-magenta px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta/70"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="mailto:imprentamagentauy@gmail.com"
                className="text-sm font-semibold text-slate-100 hover:text-brand-rosaClaro"
              >
                Enviar un email
              </a>
            </div>
          </div>
  
          <section className="rounded-3xl bg-slate-800 p-6 sm:p-8 shadow-xl">
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-200">
                    Nombre / Empresa
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                    placeholder="Tu nombre o el de tu negocio"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-200">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                    placeholder="+598..."
                  />
                </div>
              </div>
  
              <div>
                <label className="block text-xs font-medium text-slate-200">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
  
              <div>
                <label className="block text-xs font-medium text-slate-200">
                  Tipo de trabajo
                </label>
                <select
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Elegí una opción (mañana vamos a definirlas bien)
                  </option>
                  <option value="bolsas">Bolsas de papel</option>
                  <option value="packaging">Packaging gastronómico</option>
                  <option value="folletos">Folletos / volantes</option>
                  <option value="papeleria">Papelería corporativa</option>
                  <option value="revistas">Revistas / catálogos</option>
                  <option value="etiquetas">Etiquetas / adhesivos</option>
                  <option value="otro">Otro tipo de trabajo</option>
                </select>
              </div>
  
              <div>
                <label className="block text-xs font-medium text-slate-200">Mensaje</label>
                <textarea
                  className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-brand-magenta"
                  rows={4}
                  placeholder="Contanos cantidades aproximadas, medidas u otros detalles que tengas claros por ahora."
                />
              </div>
  
              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-brand-magenta px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-rosa transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
              >
                Enviar consulta
              </button>
            </form>
          </section>
        </div>
      </main>
    );
  }