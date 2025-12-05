import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  Globe,
  Video,
  Scissors,
  Share2,
  Download,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("scripts");

  useEffect(() => {
    fetchProject();
    const interval = setInterval(() => {
      if (project?.status === "processing") {
        fetchProject();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) throw new Error("Failed to fetch project");
      const data = await response.json();
      setProject(data.project);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0A0A0F",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#00FFA3" />
        <Text style={{ color: "#FFFFFF", marginTop: 16, fontSize: 16 }}>
          Loading project...
        </Text>
      </View>
    );
  }

  if (project?.status === "processing") {
    return (
      <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
        <StatusBar style="light" />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <LinearGradient
            colors={["#6B5BFF", "#FF00CC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            <ActivityIndicator size="large" color="#FFFFFF" />
          </LinearGradient>

          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            AI is Processing...
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#9CA3AF",
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Generating scripts, posts & more ✨
          </Text>

          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 20,
              padding: 20,
              width: "100%",
              maxWidth: 300,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#00FFA3",
                  marginRight: 12,
                }}
              />
              <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
                Analyzing content
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#6B5BFF",
                  marginRight: 12,
                }}
              />
              <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
                Generating scripts
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#FF00CC",
                  marginRight: 12,
                }}
              />
              <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
                Creating posts
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              marginTop: 32,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: "#2A2A3E",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const tabs = [
    { id: "scripts", label: "Scripts", icon: FileText, color: "#6B5BFF" },
    { id: "posts", label: "Posts", icon: MessageSquare, color: "#00FFA3" },
    { id: "seo", label: "SEO", icon: Globe, color: "#FF00CC" },
    { id: "clips", label: "Clips", icon: Scissors, color: "#FFD700" },
  ];

  const outputs = project?.outputs || {};
  const scripts = outputs.scripts || [];
  const posts = outputs.posts || [];
  const seoSummary = outputs.seo_summary || "";

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
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#FFFFFF" }}
            >
              {project?.type?.charAt(0).toUpperCase() + project?.type?.slice(1)}{" "}
              Project
            </Text>
            <Text style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
              {new Date(project?.created_at).toLocaleDateString()}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#00FFA3",
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Share2 color="#0A0A0F" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 70, borderBottomWidth: 1, borderColor: "#1A1A2E" }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 12,
          gap: 8,
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isActive ? `${tab.color}20` : "#1A1A2E",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isActive ? tab.color : "transparent",
                marginRight: 8,
              }}
            >
              <Icon color={isActive ? tab.color : "#6B7280"} size={18} />
              <Text
                style={{
                  color: isActive ? tab.color : "#6B7280",
                  marginLeft: 8,
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "scripts" && (
          <View>
            {scripts.length === 0 ? (
              <View
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  padding: 40,
                  alignItems: "center",
                }}
              >
                <FileText
                  color="#6B5BFF"
                  size={48}
                  style={{ marginBottom: 12 }}
                />
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
                >
                  No scripts yet
                </Text>
              </View>
            ) : (
              scripts.map((script, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#1A1A2E",
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 12,
                    borderWidth: 2,
                    borderColor: "#6B5BFF",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "#6B5BFF",
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      SCRIPT #{index + 1}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#6B5BFF",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "#0A0A0F",
                          fontSize: 11,
                          fontWeight: "700",
                        }}
                      >
                        COPY
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{ color: "#FFFFFF", fontSize: 15, lineHeight: 24 }}
                  >
                    {script.text || script}
                  </Text>
                  {script.duration && (
                    <Text
                      style={{ color: "#9CA3AF", fontSize: 12, marginTop: 8 }}
                    >
                      ⏱️ {script.duration}
                    </Text>
                  )}
                </View>
              ))
            )}
          </View>
        )}

        {activeTab === "posts" && (
          <View>
            {posts.length === 0 ? (
              <View
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  padding: 40,
                  alignItems: "center",
                }}
              >
                <MessageSquare
                  color="#00FFA3"
                  size={48}
                  style={{ marginBottom: 12 }}
                />
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
                >
                  No posts yet
                </Text>
              </View>
            ) : (
              posts.map((post, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#1A1A2E",
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 12,
                    borderWidth: 2,
                    borderColor: "#00FFA3",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: "#00FFA3",
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      {post.platform?.toUpperCase() || "POST"}
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("/(tabs)/schedule")}
                      style={{
                        backgroundColor: "#00FFA3",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "#0A0A0F",
                          fontSize: 11,
                          fontWeight: "700",
                        }}
                      >
                        SCHEDULE
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 15,
                      lineHeight: 24,
                      marginBottom: 12,
                    }}
                  >
                    {post.content || post}
                  </Text>
                  {post.hashtags && (
                    <Text style={{ color: "#00FFA3", fontSize: 13 }}>
                      {post.hashtags}
                    </Text>
                  )}
                </View>
              ))
            )}
          </View>
        )}

        {activeTab === "seo" && (
          <View>
            {!seoSummary ? (
              <View
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  padding: 40,
                  alignItems: "center",
                }}
              >
                <Globe color="#FF00CC" size={48} style={{ marginBottom: 12 }} />
                <Text
                  style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}
                >
                  No SEO summary yet
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  padding: 20,
                  borderWidth: 2,
                  borderColor: "#FF00CC",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#FF00CC",
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    SEO BLOG POST
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FF00CC",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#0A0A0F",
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      COPY
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{ color: "#FFFFFF", fontSize: 15, lineHeight: 24 }}
                >
                  {seoSummary}
                </Text>
              </View>
            )}
          </View>
        )}

        {activeTab === "clips" && (
          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 20,
              padding: 40,
              alignItems: "center",
            }}
          >
            <Scissors color="#FFD700" size={48} style={{ marginBottom: 12 }} />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Create AI Clips
            </Text>
            <Text
              style={{
                color: "#9CA3AF",
                fontSize: 14,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Use the video editor to create clips
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/editor")}
              style={{
                backgroundColor: "#FFD700",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "#0A0A0F", fontWeight: "700" }}>
                Open Video Editor
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
