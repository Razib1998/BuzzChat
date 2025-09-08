import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import assets from "../assets/assets";

import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const LoginPage = () => {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"

  const [signin, setSignin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSigninChange = (e) => {
    const { id, value } = e.target;
    setSignin((p) => ({ ...p, [id]: value }));
  };
  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignup((p) => ({ ...p, [id]: value }));
  };

  // const resetSignin = () => setSignin({ email: "", password: "" });

  const submitSignin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login("signin", signin);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };
  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(signup);
      await login("signup", signup);
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="relative min-h-screen w-full grid place-items-center bg-[#0b1020]">
      {/* very soft background mist */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70
        bg-[radial-gradient(55%_40%_at_20%_20%,rgba(148,163,184,0.15),transparent),
            radial-gradient(45%_30%_at_80%_10%,rgba(56,189,248,0.12),transparent),
            radial-gradient(40%_25%_at_50%_90%,rgba(99,102,241,0.10),transparent)]"
      />

      {/* Animated subtle gradient border (fixed size + centered) */}
      <motion.div
        className="relative p-[2px] rounded-3xl w-[1100px] h-[700px] max-w-[95vw] max-h-[92vh] grid place-items-stretch"
        style={{
          background:
            "linear-gradient(130deg, rgba(148,163,184,0.45), rgba(56,189,248,0.40), rgba(99,102,241,0.40), rgba(148,163,184,0.45))",
          backgroundSize: "220% 220%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
      >
        {/* Inner surface */}
        <div className="relative rounded-3xl h-full w-full bg-slate-900/60 backdrop-blur-xl border border-slate-300/10 overflow-hidden">
          <div className="h-full w-full grid lg:grid-cols-2 items-center justify-items-center gap-10 px-6 sm:px-10">
            {/* Image / copy (top on small, left on large) */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <img
                  src={assets.logo}
                  alt="QuickChat logo"
                  className="w-[min(34vw,300px)] max-w-[100px] lg:max-w-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                />
                <div className="ml-10 max-w-md text-center lg:text-left">
                  <h2 className="text-2xl font-semibold text-slate-100">
                    Welcome to BuzzChat
                  </h2>
                  <p className="mt-2 text-slate-300/80">
                    Simple, fast and secure.{" "}
                    {mode === "signin"
                      ? "Sign in to continue."
                      : "Create your account to get started."}
                  </p>
                </div>
              </div>
            </div>

            {/* Auth card */}
            <div className="w-full max-w-md">
              <div className="rounded-2xl border border-slate-300/10 bg-slate-800/40 p-6 shadow-2xl sm:p-8">
                {/* Toggle with soft pill */}
                <div className="mb-6 flex justify-center">
                  <div className="relative inline-flex rounded-xl border border-slate-300/10 bg-slate-700/30 p-1 w-full max-w-xs">
                    <motion.div
                      layout
                      layoutId="auth-pill"
                      className="absolute inset-y-1 w-1/2 rounded-lg bg-slate-200/15"
                      style={{
                        left: mode === "signin" ? "4px" : "calc(50% + 4px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                        mass: 0.6,
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setMode("signin")}
                      className={`relative z-10 w-1/2 px-4 py-2 text-sm rounded-lg transition ${
                        mode === "signin"
                          ? "text-slate-100"
                          : "text-slate-300/80 hover:text-slate-200"
                      }`}
                      aria-pressed={mode === "signin"}
                    >
                      Sign in
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className={`relative z-10 w-1/2 px-4 py-2 text-sm rounded-lg transition ${
                        mode === "signup"
                          ? "text-slate-100"
                          : "text-slate-300/80 hover:text-slate-200"
                      }`}
                      aria-pressed={mode === "signup"}
                    >
                      Sign up
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl font-semibold text-slate-100 text-center">
                  {mode === "signin" ? "Welcome back" : "Create your account"}
                </h1>

                {/* Smooth form swap */}
                <motion.div layout className="mt-6 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    {mode === "signin" ? (
                      <motion.form
                        key="signin"
                        onSubmit={submitSignin}
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-sm text-slate-200/90"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={signin.email}
                            onChange={handleSigninChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-xl border border-slate-300/15 bg-slate-900/50 px-3 py-2 text-slate-100 placeholder-slate-300/40 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-300/60"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="mb-2 block text-sm text-slate-200/90"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            value={signin.password}
                            onChange={handleSigninChange}
                            autoComplete="current-password"
                            required
                            className="w-full rounded-xl border border-slate-300/15 bg-slate-900/50 px-3 py-2 text-slate-100 placeholder-slate-300/40 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-300/60"
                          />
                        </div>

                        <button
                          disabled={loading}
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-slate-400/70 via-sky-400/70 to-slate-400/70 px-4 py-2.5 font-medium text-slate-950 shadow-lg transition hover:from-slate-300/80 hover:via-sky-300/80 hover:to-slate-300/80 focus:outline-none focus:ring-2 focus:ring-slate-100/40"
                        >
                          {loading ? "Loading" : "Sign in"}
                        </button>
                      </motion.form>
                    ) : (
                      <motion.form
                        key="signup"
                        onSubmit={submitSignup}
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-2 block text-sm text-slate-200/90"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            value={signup.fullName}
                            onChange={handleSignupChange}
                            placeholder="Your full name"
                            autoComplete="fullName"
                            required
                            className="w-full rounded-xl border border-slate-300/15 bg-slate-900/50 px-3 py-2 text-slate-100 placeholder-slate-300/40 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-300/60"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-sm text-slate-200/90"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={signup.email}
                            onChange={handleSignupChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-xl border border-slate-300/15 bg-slate-900/50 px-3 py-2 text-slate-100 placeholder-slate-300/40 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-300/60"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="password"
                            className="mb-2 block text-sm text-slate-200/90"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            value={signup.password}
                            onChange={handleSignupChange}
                            autoComplete="new-password"
                            required
                            className="w-full rounded-xl border border-slate-300/15 bg-slate-900/50 px-3 py-2 text-slate-100 placeholder-slate-300/40 outline-none focus:border-transparent focus:ring-2 focus:ring-sky-300/60"
                          />
                        </div>

                        <button
                          disabled={loading}
                          type="submit"
                          className="w-full rounded-xl bg-gradient-to-r from-slate-400/70 via-sky-400/70 to-slate-400/70 px-4 py-2.5 font-medium text-slate-950 shadow-lg transition hover:from-slate-300/80 hover:via-sky-300/80 hover:to-slate-300/80 focus:outline-none focus:ring-2 focus:ring-slate-100/40"
                        >
                          {loading ? "Loading" : "Sign up"}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <p className="mt-4 text-center text-xs text-slate-300/70">
                By continuing you agree to our Terms & Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
