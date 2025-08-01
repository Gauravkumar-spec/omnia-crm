// import { useState } from 'react';
// import axios from 'axios';

// function Agent() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append('name', name);
//     data.append('email', email);
//     data.append('phone', phone);
//     if (image) data.append('image', image);

//     try {
//       await axios.post('http://localhost:5000/api/agents', data);
//       alert('Agent added successfully!');
//     } catch (err) {
//       console.error('Error adding agent:', err);
//       alert('Failed to add agent');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 bg-gray-800 shadow-lg rounded-lg space-y-4 max-w-md mx-auto mt-10">
//       <h2 className="text-xl font-semibold">Add Agent</h2>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Agent Name" className="input" />
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" />
//       <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="input" />
//       <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="input" />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Agent</button>
//     </form>
//   );
// }

// export default Agent;







import { useState } from 'react';
import axios from 'axios';

function Agent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('phone', phone);
    if (image) data.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/agents', data);
      setSuccessMessage('Agent added successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setImage(null);
    } catch (err) {
      console.error('Error adding agent:', err);
      setErrorMessage(err.response?.data?.message || 'Failed to add agent');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-4 flex items-center justify-center">
      {/* Subtle grid texture */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI11LDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-20 pointer-events-none"></div>

      {/* Floating micro-interactions */}
      <div className="fixed top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full filter blur-md animate-float opacity-80 pointer-events-none"></div>
      <div className="fixed top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full filter blur-sm animate-float animation-delay-2000 opacity-60 pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-3 h-3 bg-amber-400 rounded-full filter blur-md animate-float animation-delay-4000 opacity-70 pointer-events-none"></div>

      <div className="relative w-full max-w-md z-10">
        {/* Glass card with inner glow */}
        <div className="bg-zinc-800/50 backdrop-blur-xl rounded-xl border border-zinc-700/50 shadow-2xl overflow-hidden">
          {/* Accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-500"></div>
          
          <div className="p-8">
            {/* Animated logo */}
            <div className="flex justify-center mb-6">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg transform rotate-45"></div>
                <svg className="absolute inset-0 m-auto text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-1">
              Add New Agent
            </h2>
            <p className="text-center text-zinc-400 text-sm mb-6">Register to our professional network</p>

            {/* Status messages */}
            {successMessage && (
              <div className="mb-4 p-3 bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-700/30 rounded-lg text-green-300 text-sm backdrop-blur-sm">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 bg-gradient-to-r from-red-900/40 to-red-800/40 border border-red-700/30 rounded-lg text-red-300 text-sm backdrop-blur-sm">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input fields with subtle glow */}
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
                  disabled={isSubmitting}
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all"
                  disabled={isSubmitting}
                />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (Optional)"
                  className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                  disabled={isSubmitting}
                />
              </div>

              {/* File upload with preview */}
              <div className="relative pt-1">
                <label className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-zinc-700/50 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-all cursor-pointer ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 mb-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-sm text-zinc-400">
                      <span className="font-medium text-cyan-400">Upload photo</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => !isSubmitting && setImage(e.target.files[0])} 
                    className="hidden" 
                    disabled={isSubmitting}
                  />
                </label>
                {image && (
                  <div className="mt-3 flex items-center justify-between bg-zinc-800/50 p-2 rounded-lg border border-zinc-700/30">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-8 h-8 overflow-hidden rounded">
                        <img src={URL.createObjectURL(image)} alt="Preview" className="absolute inset-0 object-cover w-full h-full" />
                      </div>
                      <span className="text-sm text-zinc-300 truncate max-w-xs">{image.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => !isSubmitting && setImage(null)}
                      className="text-zinc-400 hover:text-amber-400 transition-colors"
                      disabled={isSubmitting}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit button with gradient shine */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 mt-6 rounded-lg font-medium transition-all duration-500 overflow-hidden relative group ${
                  isSubmitting ? 'bg-zinc-700 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:shadow-lg'
                }`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Register Agent'
                  )}
                </span>
                {!isSubmitting && (
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(10px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(-20px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Agent;