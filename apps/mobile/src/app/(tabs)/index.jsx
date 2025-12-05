import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Sparkles,
  Video,
  Mic,
  FileText,
  Zap,
  TrendingUp,
} from "lucide-react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      <StatusBar style="light" />

      {/* Header with gradient */}
      <LinearGradient
        colors={["#6B5BFF", "#FF00CC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{ fontSize: 32, fontWeight: "bold", color: "#FFFFFF" }}
            >
              ACCELIFY
            </Text>
            <Text style={{ fontSize: 14, color: "#E0E0E0", marginTop: 4 }}>
              AI Creator Studio ✨
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "rgba(0, 255, 163, 0.2)",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#00FFA3",
            }}
          >
            <Text style={{ color: "#00FFA3", fontSize: 12, fontWeight: "700" }}>
              FREE PLAN
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/create")}
              style={{
                flex: 1,
                backgroundColor: "#1A1A2E",
                borderRadius: 20,
                padding: 20,
                borderWidth: 2,
                borderColor: "#00FFA3",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "rgba(0, 255, 163, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <Sparkles color="#00FFA3" size={24} />
              </View>
              <Text
                style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}
              >
                New Project
              </Text>
              <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>
                Repurpose content
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/schedule")}
              style={{
                flex: 1,
                backgroundColor: "#1A1A2E",
                borderRadius: 20,
                padding: 20,
                borderWidth: 2,
                borderColor: "#6B5BFF",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: "rgba(107, 91, 255, 0.2)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <Zap color="#6B5BFF" size={24} />
              </View>
              <Text
                style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}
              >
                Schedule
              </Text>
              <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>
                Auto-post content
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            Your Stats
          </Text>

          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: "#2A2A3E",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 28, fontWeight: "bold", color: "#00FFA3" }}
                >
                  {projects.length}
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>
                  Projects
                </Text>
              </View>

              <View style={{ width: 1, backgroundColor: "#2A2A3E" }} />

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 28, fontWeight: "bold", color: "#6B5BFF" }}
                >
                  {projects.reduce(
                    (acc, p) => acc + (p.outputs?.scripts?.length || 0),
                    0,
                  )}
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>
                  Scripts
                </Text>
              </View>

              <View style={{ width: 1, backgroundColor: "#2A2A3E" }} />

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 28, fontWeight: "bold", color: "#FF00CC" }}
                >
                  {projects.reduce(
                    (acc, p) => acc + (p.outputs?.clips?.length || 0),
                    0,
                  )}
                </Text>
                <Text style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>
                  Clips
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Projects */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            Recent Projects
          </Text>

          {loading ? (
            <View
              style={{
                backgroundColor: "#1A1A2E",
                borderRadius: 20,
                padding: 40,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#9CA3AF" }}>Loading...</Text>
            </View>
          ) : projects.length === 0 ? (
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
              <Video color="#6B5BFF" size={48} style={{ marginBottom: 12 }} />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 4,
                }}
              >
                No projects yet
              </Text>
              <Text
                style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center" }}
              >
                Create your first AI-powered content project
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/create")}
                style={{
                  backgroundColor: "#00FFA3",
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 12,
                  marginTop: 16,
                }}
              >
                <Text style={{ color: "#0A0A0F", fontWeight: "700" }}>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            projects.slice(0, 5).map((project) => (
              <TouchableOpacity
                key={project.id}
                onPress={() => router.push(`/(tabs)/project/${project.id}`)}
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: "#2A2A3E",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      backgroundColor:
                        project.type === "video"
                          ? "rgba(107, 91, 255, 0.2)"
                          : project.type === "podcast"
                            ? "rgba(0, 255, 163, 0.2)"
                            : "rgba(255, 0, 204, 0.2)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {project.type === "video" && (
                      <Video color="#6B5BFF" size={24} />
                    )}
                    {project.type === "podcast" && (
                      <Mic color="#00FFA3" size={24} />
                    )}
                    {project.type === "article" && (
                      <FileText color="#FF00CC" size={24} />
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      {project.type.charAt(0).toUpperCase() +
                        project.type.slice(1)}{" "}
                      Project
                    </Text>
                    <Text
                      style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }}
                    >
                      {new Date(project.created_at).toLocaleDateString()}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor:
                        project.status === "completed"
                          ? "rgba(0, 255, 163, 0.2)"
                          : "rgba(255, 165, 0, 0.2)",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          project.status === "completed"
                            ? "#00FFA3"
                            : "#FFA500",
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      {project.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
