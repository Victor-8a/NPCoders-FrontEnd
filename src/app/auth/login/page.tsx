"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Code, Facebook, Github, Twitter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeElements, setCodeElements] = useState<Array<React.CSSProperties>>([]);
  const [scanEffect, setScanEffect] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Generar elementos de código solo en el cliente
  useEffect(() => {
    const elements = Array.from({ length: 20 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.8 + 0.2,
      transform: `rotate(${Math.random() * 360}deg)`,
    }));
    setCodeElements(elements);
  }, []);

  // Efecto de escaneo
  useEffect(() => {
    if (scanEffect) {
      const timer = setTimeout(() => {
        setScanEffect(false);
        if (success) {
          router.push('/dashboard/menu');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [scanEffect, success, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setScanEffect(true);
  
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      setIsLoading(false);
      setScanEffect(false);
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Todos los campos son obligatorios.",
        action: <ToastAction altText="Intentar de nuevo">Intentar de nuevo</ToastAction>,
      });
      return;
    }
  
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.log('Error en el login:', data);
        throw new Error(data.message || 'Error en el login');
      }
  
      // Login exitoso
      setSuccess(true);
      toast({
        title: "¡Acceso concedido!",
        description: "Bienvenido a la matriz de desarrollo.",
        className: "bg-gradient-to-r from-[#00ff00]/20 to-[#00cc00]/20 border-[#00ff00]/50",
      });
      
      // La redirección se manejará después del efecto de escaneo
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al conectar con el servidor');
      setScanEffect(false);
      toast({
        variant: "destructive",
        title: "Acceso denegado",
        description: err instanceof Error ? err.message : "Error al conectar con el servidor",
        action: <ToastAction altText="Intentar de nuevo">Intentar de nuevo</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Patrón de circuitos estilo Ultra T */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuitPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="#00ff00" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="2" fill="#00ff00" />
              <circle cx="90" cy="10" r="2" fill="#00ff00" />
              <circle cx="90" cy="90" r="2" fill="#00ff00" />
              <circle cx="10" cy="90" r="2" fill="#00ff00" />
              <path d="M10,50 L40,50 M60,50 L90,50 M50,10 L50,40 M50,60 L50,90" stroke="#00ff00" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="5" fill="none" stroke="#00ff00" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuitPattern)" />
          </svg>
        </div>
        <div className="absolute top-20 left-10 w-60 h-60 bg-[#00ff00] rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00ff00] rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      {/* Líneas de código simuladas en el fondo - Ahora generadas solo en el cliente */}
      <div className="absolute inset-0 opacity-10">
        {codeElements.map((style, i) => (
          <div
            key={i}
            className="absolute text-xs text-[#00ff00] font-mono"
            style={style}
          >
            {i % 3 === 0 ? "function upgrade() { return alien; }" : 
             i % 3 === 1 ? "const omnitrix = new Omnitrix();" : 
             "class UltraT extends Alien {}"}
          </div>
        ))}
      </div>

      {/* Efecto de escaneo */}
      {scanEffect && (
        <div className="absolute inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="absolute top-0 left-0 w-full h-8 bg-[#00ff00]/30 animate-scan"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00ff00] text-xl font-bold">
            {success ? "ACCESO CONCEDIDO" : "VERIFICANDO CREDENCIALES..."}
          </div>
        </div>
      )}

      <Card className="w-full max-w-md shadow-[0_0_25px_rgba(0,255,0,0.3)] rounded-2xl border border-[#00ff00]/20 backdrop-blur-sm bg-black/80 relative z-10">
        <div className="absolute inset-0 rounded-2xl border border-[#00ff00]/20 opacity-50 overflow-hidden">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-[#00ff00]/20 to-transparent animate-[gradient_3s_ease_infinite]"></div>
        </div>

        <CardHeader className="space-y-2 text-center relative z-10">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00ff00] to-[#00cc00] shadow-lg shadow-[#00ff00]/30 overflow-hidden">
            {/* Silueta de Ultra T */}
            <svg viewBox="0 0 24 24" className="h-12 w-12 text-black" fill="currentColor">
              <path d="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M12,5 C8.13401,5 5,8.13401 5,12 C5,15.866 8.13401,19 12,19 C15.866,19 19,15.866 19,12 C19,8.13401 15.866,5 12,5 Z M12,8 C14.2091,8 16,9.79086 16,12 C16,14.2091 14.2091,16 12,16 C9.79086,16 8,14.2091 8,12 C8,9.79086 9.79086,8 12,8 Z M12,10 C10.8954,10 10,10.8954 10,12 C10,13.1046 10.8954,14 12,14 C13.1046,14 14,13.1046 14,12 C14,10.8954 13.1046,10 12,10 Z" />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff00] via-white to-[#00ff00]">
            NPCoders
          </CardTitle>
          <CardDescription className="text-sm text-[#cccccc]">
            Accede a la matriz con tecnología <span className="text-[#00ff00] font-bold">Ultra T</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 relative z-10">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Acceso Denegado</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#cccccc] flex items-center">
                ID de Usuario <span className="text-[#00ff00] ml-1">*</span>
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@npcoders.dev"
                  className="bg-black/70 border-[#00ff00]/30 focus:border-[#00ff00] focus:ring-[#00ff00]/20 text-white pl-10 transition-all duration-300 group-hover:border-[#00ff00]/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FiMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff00] group-hover:scale-110 transition-transform"
                  size={18}
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#cccccc] flex items-center">
                  Código de Acceso <span className="text-[#00ff00] ml-1">*</span>
                </Label>
                <Link 
                  href="#" 
                  className="text-xs text-[#00ff00] hover:text-white transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Recuperación de código",
                      description: "Se ha enviado un enlace de recuperación a tu correo.",
                      className: "bg-gradient-to-r from-[#00ff00]/20 to-[#00cc00]/20 border-[#00ff00]/50",
                    });
                  }}
                >
                  ¿Olvidaste tu código?
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#00ff00] group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-black/70 border-[#00ff00]/30 focus:border-[#00ff00] focus:ring-[#00ff00]/20 text-white pl-10 pr-10 transition-all duration-300 group-hover:border-[#00ff00]/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FiLock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00ff00] group-hover:scale-110 transition-transform"
                  size={18}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00ff00] hover:text-[#00cc00] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#00ff00] to-[#00cc00] hover:from-[#00cc00] hover:to-[#009900] text-black font-medium shadow-lg shadow-[#00ff00]/20 transition-all duration-300 hover:shadow-[#00ff00]/40 relative overflow-hidden group"
              disabled={isLoading}
            >
              <span className="relative z-10">{isLoading ? "VERIFICANDO..." : "INICIAR SESIÓN"}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ff00]/0 via-[#ffffff]/30 to-[#00ff00]/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-[#00ff00]/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-[#cccccc] backdrop-blur-sm">O conéctate con</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 border-[#00ff00]/30 bg-black/70 hover:bg-[#00ff00]/10 text-[#cccccc] transition-all duration-300 hover:border-[#00ff00]/50 group"
              onClick={() => {
                toast({
                  title: "Conexión externa",
                  description: "Conectando con Facebook...",
                  className: "bg-gradient-to-r from-[#00ff00]/20 to-[#00cc00]/20 border-[#00ff00]/50",
                });
              }}
            >
              <Facebook className="h-4 w-4 text-[#00ff00] group-hover:scale-110 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 border-[#00ff00]/30 bg-black/70 hover:bg-[#00ff00]/10 text-[#cccccc] transition-all duration-300 hover:border-[#00ff00]/50 group"
              onClick={() => {
                toast({
                  title: "Conexión externa",
                  description: "Conectando con Twitter...",
                  className: "bg-gradient-to-r from-[#00ff00]/20 to-[#00cc00]/20 border-[#00ff00]/50",
                });
              }}
            >
              <Twitter className="h-4 w-4 text-[#00ff00] group-hover:scale-110 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 border-[#00ff00]/30 bg-black/70 hover:bg-[#00ff00]/10 text-[#cccccc] transition-all duration-300 hover:border-[#00ff00]/50 group"
              onClick={() => {
                toast({
                  title: "Conexión externa",
                  description: "Conectando con GitHub...",
                  className: "bg-gradient-to-r from-[#00ff00]/20 to-[#00cc00]/20 border-[#00ff00]/50",
                });
              }}
            >
              <Github className="h-4 w-4 text-[#00ff00] group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center border-t border-[#00ff00]/20 p-6 relative z-10">
          <p className="text-center text-sm text-[#cccccc]">
            ¿Sin acceso al sistema?{" "}
            <Link href="/auth/register" className="font-medium text-[#00ff00] hover:text-white transition-colors relative group">
              Regístrate ahora
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#00ff00] group-hover:w-full transition-all duration-300"></span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
