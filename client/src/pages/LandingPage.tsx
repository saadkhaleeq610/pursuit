import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "phosphor-react";
import { motion } from "framer-motion";
import * as THREE from "three";

export default function LandingPage() {
  const threeJsContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!threeJsContainer.current) return;

    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeJsContainer.current.appendChild(renderer.domElement);

    // Add a floating cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x011200, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#011200]">Pursuit</div>
        <div className="flex space-x-4">
          <Button variant="ghost" className="text-[#011200]">
            Pricing
          </Button>
          <Link to="/login">
            <Button variant="ghost" className="text-[#011200]">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-[#011200] text-white hover:bg-[#011200]/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        <div ref={threeJsContainer} className="absolute inset-0 z-0" />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <motion.h1
            className="text-5xl font-bold text-[#011200] mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Power Your Restaurant with <span className="text-[#011200]">Pursuit</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Manage orders, customers, and sales effortlessly. Integrate{" "}
            <strong>Pursuit API</strong> with your website for real-time updates and seamless
            operations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/register-restaurant">
              <Button className="bg-[#011200] text-white hover:bg-[#011200]/90 px-8 py-4 text-lg rounded-xl shadow-md">
                Start Managing Your Restaurant
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#011200] text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Step 1: Sign Up",
                description: "Create your account and connect your restaurant.",
                link: "/signup",
              },
              {
                title: "Step 2: Integrate",
                description: "Integrate Pursuit API with your website or app.",
                link: "/register-restaurant",
              },
              {
                title: "Step 3: Manage",
                description: "Start managing orders, customers, and sales effortlessly.",
                link: "/dashboard", // Add a dashboard route if applicable
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle size={24} className="text-[#011200]" />
                      <h3 className="text-xl font-semibold text-[#011200]">{step.title}</h3>
                    </div>
                    <p className="text-gray-700">{step.description}</p>
                    <Link to={step.link}>
                      <Button className="mt-4 bg-[#011200] text-white hover:bg-[#011200]/90">
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#011200] text-center mb-8">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                plan: "Basic",
                price: "$29/mo",
                features: ["Order Management", "Customer Insights"],
              },
              {
                plan: "Pro",
                price: "$59/mo",
                features: ["Order Management", "Customer Insights", "Sales Analytics"],
              },
              {
                plan: "Enterprise",
                price: "Custom",
                features: ["All Pro Features", "Pursuit API Access", "Dedicated Support"],
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-[#011200] mb-4">{plan.plan}</h3>
                    <p className="text-4xl font-bold text-[#011200] mb-6">{plan.price}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-[#011200]" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-[#011200] text-white hover:bg-[#011200]/90">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#011200] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Pursuit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}