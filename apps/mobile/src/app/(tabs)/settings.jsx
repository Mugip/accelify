import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Settings as SettingsIcon,
  User,
  Crown,
  Palette,
  Bell,
  Shield,
  LogOut,
} from "lucide-react-native";
import { useState } from "react";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);

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
              backgroundColor: "rgba(255, 0, 204, 0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <SettingsIcon color="#FF00CC" size={40} />
          </View>

          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            Settings
          </Text>
          <Text style={{ fontSize: 16, color: "#9CA3AF", marginBottom: 32 }}>
            Customize your experience
          </Text>

          {/* Account Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                color: "#9CA3AF",
                fontSize: 12,
                fontWeight: "700",
                marginBottom: 12,
                letterSpacing: 1,
              }}
            >
              ACCOUNT
            </Text>

            <View
              style={{
                backgroundColor: "#1A1A2E",
                borderRadius: 16,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#2A2A3E",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  borderBottomWidth: 1,
                  borderColor: "#2A2A3E",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(0, 255, 163, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <User color="#00FFA3" size={20} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Profile
                  </Text>
                  <Text
                    style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }}
                  >
                    Edit your profile information
                  </Text>
                </View>

                <Text style={{ color: "#6B5BFF", fontSize: 20 }}>→</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Crown color="#FFD700" size={20} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Upgrade to Pro
                  </Text>
                  <Text
                    style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }}
                  >
                    Unlock unlimited features
                  </Text>
                </View>

                <Text style={{ color: "#FFD700", fontSize: 20 }}>→</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Preferences Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                color: "#9CA3AF",
                fontSize: 12,
                fontWeight: "700",
                marginBottom: 12,
                letterSpacing: 1,
              }}
            >
              PREFERENCES
            </Text>

            <View
              style={{
                backgroundColor: "#1A1A2E",
                borderRadius: 16,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#2A2A3E",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  borderBottomWidth: 1,
                  borderColor: "#2A2A3E",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(107, 91, 255, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Palette color="#6B5BFF" size={20} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Brand Kit
                  </Text>
                  <Text
                    style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }}
                  >
                    Customize your brand style
                  </Text>
                </View>

                <Text style={{ color: "#6B5BFF", fontSize: 20 }}>→</Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 0, 204, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Bell color="#FF00CC" size={20} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Notifications
                  </Text>
                  <Text
                    style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }}
                  >
                    Manage notification settings
                  </Text>
                </View>

                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{
                    false: "#2A2A3E",
                    true: "rgba(0, 255, 163, 0.3)",
                  }}
                  thumbColor={notifications ? "#00FFA3" : "#6B7280"}
                />
              </View>
            </View>
          </View>

          {/* Other Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                color: "#9CA3AF",
                fontSize: 12,
                fontWeight: "700",
                marginBottom: 12,
                letterSpacing: 1,
              }}
            >
              OTHER
            </Text>

            <View
              style={{
                backgroundColor: "#1A1A2E",
                borderRadius: 16,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#2A2A3E",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  borderBottomWidth: 1,
                  borderColor: "#2A2A3E",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(0, 255, 163, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Shield color="#00FFA3" size={20} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Privacy & Terms
                  </Text>
                  <Text
                    style={{ color: "#9CA3AF", fontSize: 12, marginTop: 2 }}
                  >
                    View privacy policy
                  </Text>
                </View>

                <Text style={{ color: "#6B5BFF", fontSize: 20 }}>→</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <LogOut color="#FF0000" size={20} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FF6B6B",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    Log Out
                  </Text>
                </View>

                <Text style={{ color: "#FF0000", fontSize: 20 }}>→</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Version */}
          <Text
            style={{
              color: "#6B7280",
              fontSize: 12,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            ACCELIFY v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
