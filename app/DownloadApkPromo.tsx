const apkHref = "/app-release.apk";

export default function DownloadApkPromo() {
  return (
    <section id="download-apk" className="mx-auto max-w-7xl px-5 py-14 scroll-mt-24">
      <div className="overflow-hidden rounded-4xl bg-linear-to-br from-blue-700 via-indigo-700 to-slate-950 p-8 text-white shadow-2xl md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black ring-1 ring-white/20">
              SmartBilling Android App
            </div>
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Download the APK and start billing today.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
              Install Smart Billing Lite on your Android phone to create bills,
              accept QR payments, print receipts, and manage udhaar from one app.
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15">
            <div className="rounded-2xl bg-white p-5 text-slate-900">
              <div className="text-sm font-black text-slate-500">
                APK file ready
              </div>
              <div className="mt-2 text-2xl font-black">app-release.apk</div>
              <a
                href={apkHref}
                download
                className="mt-5 block rounded-2xl bg-green-600 px-7 py-4 text-center font-black text-white shadow-lg shadow-green-100 hover:bg-green-700"
              >
                Download APK
              </a>
              <p className="mt-3 text-center text-xs font-semibold text-slate-500">
                Works on Android devices that allow APK installation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
