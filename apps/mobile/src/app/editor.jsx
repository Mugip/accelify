import { View, Text, ScrollView, TouchableOpacity, Slider } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useState } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  Scissors,
  Type,
  Music,
  Mic,
  Sparkles,
  Download,
  Layers,
  Wand2,
  ZoomIn,
  Image as ImageIcon,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function VideoEditorScreen() {
  const insets = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("auto");

  const tools = [
    { id: "auto", label: "Auto AI", icon: Sparkles, color: "#00FFA3" },
    { id: "subtitles", label: "Subtitles", icon: Type, color: "#6B5BFF" },
    { id: "music", label: "Music", icon: Music, color: "#FF00CC" },
    { id: "voiceover", label: "Voice", icon: Mic, color: "#FFD700" },
    { id: "effects", label: "Effects", icon: Wand2, color: "#00FFA3" },
  ];

  const autoAIFeatures = [
    {
      label: "Auto Clip (5-15 clips)",
      action: "autoclip",
      icon: Scissors,
      color: "#00FFA3",
    },
    {
      label: "Auto Subtitles",
      action: "subtitles",
      icon: Type,
      color: "#6B5BFF",
    },
    {
      label: "Auto Zoom (MrBeast)",
      action: "zoom",
      icon: ZoomIn,
      color: "#FF00CC",
    },
    { label: "Add Emojis", action: "emojis", icon: Sparkles, color: "#FFD700" },
  ];

  const subtitleStyles = [
    { id: "kinetic", name: "Kinetic", color: "#00FFA3" },
    { id: "bold", name: "Bold", color: "#6B5BFF" },
    { id: "genz", name: "Gen-Z", color: "#FF00CC" },
    { id: "glow", name: "Glow", color: "#FFD700" },
  ];

  const aspectRatios = [
    { id: "9:16", label: "TikTok/Reels", value: "9:16" },
    { id: "1:1", label: "Instagram", value: "1:1" },
    { id: "16:9", label: "YouTube", value: "16:9" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderColor: "#1A1A2E",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}>
            AI Video Editor
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#00FFA3",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Download color="#0A0A0F" size={18} />
              <Text
                style={{
                  color: "#0A0A0F",
                  fontWeight: "700",
                  marginLeft: 6,
                  fontSize: 14,
                }}
              >
                Export
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Preview */}
        <View style={{ margin: 20 }}>
          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 20,
              aspectRatio: 9 / 16,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "#2A2A3E",
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={["#6B5BFF", "#FF00CC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.2,
              }}
            />
            <ImageIcon color="#6B7280" size={80} style={{ marginBottom: 16 }} />
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
              Video Preview
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>
              Upload or import video
            </Text>
          </View>

          {/* Play/Pause Control */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => setIsPlaying(!isPlaying)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#00FFA3",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isPlaying ? (
                <Pause color="#0A0A0F" size={28} fill="#0A0A0F" />
              ) : (
                <Play color="#0A0A0F" size={28} fill="#0A0A0F" />
              )}
            </TouchableOpacity>
          </View>

          {/* Timeline */}
          <View
            style={{
              marginTop: 20,
              backgroundColor: "#1A1A2E",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <Text style={{ color: "#9CA3AF", fontSize: 12, marginBottom: 8 }}>
              Timeline
            </Text>
            <View
              style={{
                height: 4,
                backgroundColor: "#2A2A3E",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "30%",
                  backgroundColor: "#00FFA3",
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ color: "#6B7280", fontSize: 11 }}>0:00</Text>
              <Text style={{ color: "#6B7280", fontSize: 11 }}>1:30</Text>
            </View>
          </View>
        </View>

        {/* Aspect Ratio Selector */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            Aspect Ratio
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {aspectRatios.map((ratio) => (
              <TouchableOpacity
                key={ratio.id}
                style={{
                  flex: 1,
                  backgroundColor: "#1A1A2E",
                  padding: 12,
                  borderRadius: 12,
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: ratio.id === "9:16" ? "#00FFA3" : "transparent",
                }}
              >
                <Text
                  style={{
                    color: ratio.id === "9:16" ? "#00FFA3" : "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "700",
                    marginBottom: 4,
                  }}
                >
                  {ratio.value}
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 11 }}>
                  {ratio.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tools Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            maxHeight: 70,
            borderBottomWidth: 1,
            borderColor: "#1A1A2E",
          }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 12,
            gap: 8,
          }}
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTab === tool.id;
            return (
              <TouchableOpacity
                key={tool.id}
                onPress={() => setActiveTab(tool.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: isActive ? `${tool.color}20` : "#1A1A2E",
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: isActive ? tool.color : "transparent",
                  marginRight: 8,
                }}
              >
                <Icon color={isActive ? tool.color : "#6B7280"} size={18} />
                <Text
                  style={{
                    color: isActive ? tool.color : "#6B7280",
                    marginLeft: 8,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  {tool.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Tool Content */}
        <View style={{ padding: 20 }}>
          {activeTab === "auto" && (
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 16,
                }}
              >
                AI Auto Features
              </Text>
              {autoAIFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: "#1A1A2E",
                      borderRadius: 16,
                      padding: 20,
                      marginBottom: 12,
                      borderWidth: 2,
                      borderColor: feature.color,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 14,
                        backgroundColor: `${feature.color}20`,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 16,
                      }}
                    >
                      <Icon color={feature.color} size={28} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        {feature.label}
                      </Text>
                      <Text
                        style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }}
                      >
                        AI-powered automation
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: feature.color,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#0A0A0F",
                          fontWeight: "700",
                          fontSize: 12,
                        }}
                      >
                        START
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {activeTab === "subtitles" && (
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 16,
                }}
              >
                Subtitle Styles
              </Text>
              {subtitleStyles.map((style) => (
                <TouchableOpacity
                  key={style.id}
                  style={{
                    backgroundColor: "#1A1A2E",
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 12,
                    borderWidth: 2,
                    borderColor: style.color,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        backgroundColor: `${style.color}20`,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <Type color={style.color} size={24} />
                    </View>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      {style.name}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: style.color,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "#0A0A0F",
                        fontWeight: "700",
                        fontSize: 12,
                      }}
                    >
                      APPLY
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === "music" && (
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 16,
                }}
              >
                Add Music
              </Text>
              <View
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  padding: 40,
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#2A2A3E",
                  borderStyle: "dashed",
                }}
              >
                <Music color="#FF00CC" size={48} style={{ marginBottom: 12 }} />
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: "600",
                    marginBottom: 4,
                  }}
                >
                  Choose Music
                </Text>
                <Text
                  style={{
                    color: "#9CA3AF",
                    fontSize: 14,
                    textAlign: "center",
                    marginBottom: 16,
                  }}
                >
                  Add background music to your video
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FF00CC",
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 12,
                  }}
                >
                  <Text style={{ color: "#0A0A0F", fontWeight: "700" }}>
                    Browse Library
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {activeTab === "voiceover" && (
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 16,
                }}
              >
                AI Voiceover
              </Text>
              <View
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 16,
                  borderWidth: 2,
                  borderColor: "#FFD700",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "600",
                    marginBottom: 12,
                  }}
                >
                  Voice Type
                </Text>
                <View style={{ gap: 8 }}>
                  {[
                    "Male",
                    "Female",
                    "Energetic",
                    "Calm",
                    "AI Robotic",
                    "Deep",
                  ].map((voice) => (
                    <TouchableOpacity
                      key={voice}
                      style={{
                        backgroundColor: "#2A2A3E",
                        padding: 14,
                        borderRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                        {voice}
                      </Text>
                      <Mic color="#FFD700" size={18} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#FFD700",
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#0A0A0F", fontSize: 16, fontWeight: "700" }}
                >
                  Generate Voiceover
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === "effects" && (
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 16,
                }}
              >
                Video Effects
              </Text>
              <View
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  padding: 40,
                  alignItems: "center",
                }}
              >
                <Wand2 color="#00FFA3" size={48} style={{ marginBottom: 12 }} />
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
                >
                  Coming Soon
                </Text>
                <Text
                  style={{
                    color: "#9CA3AF",
                    fontSize: 14,
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  Transitions, filters & more
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
