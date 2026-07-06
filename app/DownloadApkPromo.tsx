const apkHref = "/app-release.apk";

export default function DownloadApkPromo() {
  return (
    <section id="download-apk" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-5 sm:py-14">
      <div className="overflow-hidden rounded-3xl bg-linear-to-br from-blue-700 via-indigo-700 to-slate-950 p-5 text-white shadow-2xl sm:p-8 md:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="min-w-0">
            <div className="mb-4 inline-flex max-w-full rounded-full bg-white/10 px-4 py-2 text-xs font-black ring-1 ring-white/20 sm:text-sm">
              SmartBilling Android App
            </div>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Download the APK and start billing today.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              Install Smart Billing Lite on your Android phone to create bills,
              accept QR payments, print receipts, and manage udhaar from one app.
            </p>
          </div>

          <div className="min-w-0 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 sm:rounded-3xl sm:p-5">
            <div className="rounded-2xl bg-white p-4 text-slate-900 sm:p-5">
              <div className="text-sm font-black text-slate-500">
                APK file ready
              </div>
              <div className="mt-2 break-all text-xl font-black sm:text-2xl">app-release.apk</div>
              <a
                href={apkHref}
                download
                className="mt-5 block rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-green-100 hover:bg-green-700 sm:rounded-2xl sm:px-7 sm:py-4 sm:text-base"
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
