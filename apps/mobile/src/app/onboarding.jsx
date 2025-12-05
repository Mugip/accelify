import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useRef } from "react";
import { router } from "expo-router";
import { Sparkles, Video, Zap, ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Sparkles,
      title: "AI Content Repurposing",
      description:
        "Transform long-form videos into viral short clips, scripts, and social posts in seconds",
      color: "#00FFA3",
      gradient: ["#00FFA3", "#00CC82"],
    },
    {
      icon: Video,
      title: "Auto Video Editor",
      description:
        "AI-powered editing with auto-captions, zoom effects, and music. No editing skills needed",
      color: "#6B5BFF",
      gradient: ["#6B5BFF", "#5847FF"],
    },
    {
      icon: Zap,
      title: "Schedule & Auto-Post",
      description:
        "Connect all your socials and schedule content to TikTok, Instagram, YouTube & more",
      color: "#FF00CC",
      gradient: ["#FF00CC", "#CC0099"],
    },
  ];

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace("/(tabs)");
    }
  };

  const handleSkip = () => {
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      <StatusBar style="light" />

      {/* Skip Button */}
      <TouchableOpacity
        onPress={handleSkip}
        style={{ position: "absolute", top: 60, right: 20, zIndex: 10 }}
      >
        <Text style={{ color: "#9CA3AF", fontSize: 16, fontWeight: "600" }}>
          Skip
        </Text>
      </TouchableOpacity>

      {/* Content */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 40,
        }}
      >
        <Animated.View
          key={currentSlide}
          entering={FadeInRight.duration(400)}
          exiting={FadeOutLeft.duration(400)}
          style={{ alignItems: "center" }}
        >
          {/* Icon with Gradient */}
          <LinearGradient
            colors={currentSlideData.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 48,
            }}
          >
            <Icon color="#FFFFFF" size={70} />
          </LinearGradient>

          {/* Title */}
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            {currentSlideData.title}
          </Text>

          {/* Description */}
          <Text
            style={{
              fontSize: 17,
              color: "#9CA3AF",
              textAlign: "center",
              lineHeight: 26,
            }}
          >
            {currentSlideData.description}
          </Text>
        </Animated.View>
      </View>

      {/* Bottom Navigation */}
      <View style={{ paddingHorizontal: 40, paddingBottom: 60 }}>
        {/* Dots Indicator */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 32,
            gap: 8,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                width: index === currentSlide ? 32 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  index === currentSlide ? currentSlideData.color : "#2A2A3E",
                transition: "all 0.3s",
              }}
            />
          ))}
        </View>

        {/* Next/Get Started Button */}
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: currentSlideData.color,
            borderRadius: 16,
            paddingVertical: 18,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#0A0A0F",
              fontSize: 18,
              fontWeight: "700",
              marginRight: 8,
            }}
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
          <ArrowRight color="#0A0A0F" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
