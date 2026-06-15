export default function ComingSoon() {
    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
            <div className="max-w-lg w-full text-center space-y-6">

                {/* Logo / Brand */}
                <p className="text-xs font-medium tracking-widest uppercase text-gray-400">
                    Dr. Ankita Chuahan
                </p>

                {/* Headline */}
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
                    Coming Soon
                </h1>

                {/* Body */}
                <p className="text-base text-gray-500 leading-relaxed">
                    We're working on something. Check back soon.
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-gray-200 mx-auto" />

            </div>
        </main>
    );
}