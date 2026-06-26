'use client'

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-[#081120] text-white p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          EduNite AI Assistant
        </h1>

        <p className="text-slate-400 mb-10">
          Your personal career mentor powered by AI.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              📄 Resume Review
            </h3>
            <p className="text-slate-400">
              Upload your resume and get AI feedback.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              🎤 Interview Prep
            </h3>
            <p className="text-slate-400">
              Practice technical and HR interviews.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              🚀 Career Roadmap
            </h3>
            <p className="text-slate-400">
              Personalized learning and career plans.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              🏆 Certificate Analysis
            </h3>
            <p className="text-slate-400">
              Analyze achievements and certifications.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              💼 Internship Guidance
            </h3>
            <p className="text-slate-400">
              Find opportunities and improve applications.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              🧠 Skill Recommendations
            </h3>
            <p className="text-slate-400">
              Discover skills needed for your target role.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}