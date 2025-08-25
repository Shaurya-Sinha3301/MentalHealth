'use client';

import { useState } from 'react';
import { AnimatedText } from './AnimatedText';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedButton } from './AnimatedButton';
import { AnimatedSVG } from './AnimatedSVG';
import { FloatingElements } from './FloatingElements';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAnimations } from './AnimationProvider';
import { Sparkles, Zap, Heart, Star } from 'lucide-react';

export function AnimationShowcase() {
  const [showDemo, setShowDemo] = useState(false);
  const { animationsEnabled, toggleAnimations } = useAnimations();

  return (
    <div className="space-y-8 p-8">
      <div className="text-center">
        <AnimatedText 
          className="text-3xl font-bold mb-4"
          animationType="reveal"
          stagger={true}
        >
          Animation Showcase
        </AnimatedText>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={toggleAnimations} variant="outline">
            {animationsEnabled ? 'Disable' : 'Enable'} Animations
          </Button>
          <Button onClick={() => setShowDemo(!showDemo)}>
            {showDemo ? 'Hide' : 'Show'} Demo
          </Button>
        </div>
      </div>

      {showDemo && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Text Animations */}
          <AnimatedCard animationType="fadeIn" delay={0.1}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Text Animations
              </CardTitle>
              <CardDescription>
                Various text reveal effects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatedText 
                className="text-lg font-semibold"
                animationType="reveal"
                delay={200}
              >
                Reveal Animation
              </AnimatedText>
              
              <AnimatedText 
                className="text-base"
                animationType="fadeIn"
                delay={400}
              >
                Fade In Effect
              </AnimatedText>
              
              <Badge className="animate-pulse">Animated Badge</Badge>
            </CardContent>
          </AnimatedCard>

          {/* Button Animations */}
          <AnimatedCard animationType="slideUp" delay={0.2}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                Interactive Buttons
              </CardTitle>
              <CardDescription>
                Hover and click effects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatedButton 
                hoverEffect={true}
                celebrateOnClick={true}
                className="w-full"
              >
                <Heart className="mr-2 h-4 w-4" />
                Celebrate Click
              </AnimatedButton>
              
              <AnimatedButton 
                variant="outline"
                hoverEffect={true}
                className="w-full"
              >
                <Star className="mr-2 h-4 w-4" />
                Hover Effect
              </AnimatedButton>
            </CardContent>
          </AnimatedCard>

          {/* SVG Animations */}
          <AnimatedCard animationType="scale" delay={0.3}>
            <CardHeader>
              <CardTitle>SVG Animations</CardTitle>
              <CardDescription>
                Path drawing and floating effects
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <AnimatedSVG className="w-32 h-24" delay={500} />
            </CardContent>
          </AnimatedCard>

          {/* Floating Elements */}
          <AnimatedCard animationType="fadeIn" delay={0.4} className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Floating Background Elements</CardTitle>
              <CardDescription>
                Subtle floating animations with different intensities
              </CardDescription>
            </CardHeader>
            <CardContent className="relative h-32 overflow-hidden">
              <FloatingElements intensity="subtle" className="absolute top-4 left-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60"></div>
              </FloatingElements>
              
              <FloatingElements intensity="normal" className="absolute top-4 right-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full opacity-70"></div>
              </FloatingElements>
              
              <FloatingElements intensity="strong" className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-50"></div>
              </FloatingElements>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedText 
                  className="text-lg font-medium text-muted-foreground"
                  animationType="fadeIn"
                  delay={1000}
                >
                  Watch the floating elements move!
                </AnimatedText>
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Animations respect your system&apos;s motion preferences and can be toggled for accessibility.
        </p>
        <p className="mt-2">
          Status: <Badge variant={animationsEnabled ? 'default' : 'secondary'}>
            {animationsEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        </p>
      </div>
    </div>
  );
}