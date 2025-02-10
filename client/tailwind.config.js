/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
		"./index.html",
		"./src/**/*.{ts,tsx,js,jsx}", // Ensure this includes all your template files
	  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
}

