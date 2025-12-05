import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Calendar,
  Plus,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react-native";
import { useState, useEffect } from "react";

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScheduledPosts();
  }, []);

  const fetchScheduledPosts = async () => {
    try {
      const response = await fetch("/api/schedule/posts");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setScheduledPosts(data.posts || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return Instagram;
      case "youtube":
        return Youtube;
      case "twitter":
      case "x":
        return Twitter;
      default:
        return Calendar;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "instagram":
        return "#FF00CC";
      case "youtube":
        return "#FF0000";
      case "twitter":
      case "x":
        return "#1DA1F2";
      case "tiktok":
        return "#00FFA3";
      default:
        return "#6B5BFF";
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0F" }}>
      <StatusBar style="light" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 20 }}>
          {/* Header */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "rgba(107, 91, 255, 0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Calendar color="#6B5BFF" size={40} />
          </View>

          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            Schedule
          </Text>
          <Text style={{ fontSize: 16, color: "#9CA3AF", marginBottom: 32 }}>
            Auto-post your content across platforms
          </Text>

          {/* Connect Accounts */}
          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 20,
              padding: 20,
              marginBottom: 24,
              borderWidth: 2,
              borderColor: "#2A2A3E",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 16,
              }}
            >
              Connected Accounts
            </Text>

            <View style={{ gap: 12 }}>
              {["TikTok", "Instagram", "YouTube", "X (Twitter)"].map(
                (platform) => (
                  <View
                    key={platform}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 12,
                    }}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 16 }}>
                      {platform}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgba(0, 255, 163, 0.1)",
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: "#00FFA3",
                      }}
                    >
                      <Text
                        style={{
                          color: "#00FFA3",
                          fontSize: 12,
                          fontWeight: "700",
                        }}
                      >
                        Connect
                      </Text>
                    </TouchableOpacity>
                  </View>
                ),
              )}
            </View>
          </View>

          {/* Scheduled Posts */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}
            >
              Upcoming Posts
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#00FFA3",
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus color="#0A0A0F" size={20} />
            </TouchableOpacity>
          </View>

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
          ) : scheduledPosts.length === 0 ? (
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
              <Calendar
                color="#6B5BFF"
                size={48}
                style={{ marginBottom: 12 }}
              />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 4,
                }}
              >
                No scheduled posts
              </Text>
              <Text
                style={{ color: "#9CA3AF", fontSize: 14, textAlign: "center" }}
              >
                Create a project and schedule it to post
              </Text>
            </View>
          ) : (
            scheduledPosts.map((post) => {
              const Icon = getPlatformIcon(post.platform);
              const color = getPlatformColor(post.platform);

              return (
                <View
                  key={post.id}
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
                      marginBottom: 12,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: `${color}20`,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon color={color} size={20} />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        {post.platform.charAt(0).toUpperCase() +
                          post.platform.slice(1)}
                      </Text>
                      <Text
                        style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }}
                      >
                        {new Date(post.scheduled_time).toLocaleString()}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor:
                          post.status === "scheduled"
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
                            post.status === "scheduled" ? "#00FFA3" : "#FFA500",
                          fontSize: 11,
                          fontWeight: "700",
                        }}
                      >
                        {post.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  {post.content && (
                    <Text
                      style={{ color: "#E0E0E0", fontSize: 14, lineHeight: 20 }}
                      numberOfLines={2}
                    >
                      {post.content}
                    </Text>
                  )}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
