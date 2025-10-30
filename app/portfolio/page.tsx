'use client';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Portfolio</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Explore our diverse portfolio of premium real estate assets across residential, commercial, and mixed-use properties.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-slate-900 mb-4">Coming Soon</h2>
              <p className="text-2xl text-slate-600">
                Our portfolio showcase is currently being updated.
              </p>
            </div>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              We're working on bringing you detailed information about our property investments. 
              Check back soon or contact us directly to learn more about our current opportunities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}