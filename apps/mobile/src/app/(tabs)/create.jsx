import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Video,
  Mic,
  FileText,
  Link2,
  Upload,
  Sparkles,
} from "lucide-react-native";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import useUpload from "@/utils/useUpload";

export default function CreateScreen() {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upload, { loading: uploading }] = useUpload();

  const contentTypes = [
    {
      id: "video",
      title: "Video",
      description: "YouTube, TikTok, or upload",
      icon: Video,
      color: "#6B5BFF",
    },
    {
      id: "podcast",
      title: "Podcast",
      description: "Audio file or URL",
      icon: Mic,
      color: "#00FFA3",
    },
    {
      id: "article",
      title: "Article",
      description: "Blog post or text URL",
      icon: FileText,
      color: "#FF00CC",
    },
  ];

  const handleUploadFile = async () => {
    try {
      setError(null);
      const result = await DocumentPicker.getDocumentAsync({
        type:
          selectedType === "video"
            ? "video/*"
            : selectedType === "podcast"
              ? "audio/*"
              : "text/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      setLoading(true);
      const { url: uploadedUrl, error: uploadError } = await upload({
        reactNativeAsset: file,
      });

      if (uploadError) {
        setError(uploadError);
        setLoading(false);
        return;
      }

      // Create project with uploaded file
      await createProject(uploadedUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to upload file");
      setLoading(false);
    }
  };

  const handleSubmitUrl = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    await createProject(url);
  };

  const createProject = async (inputUrl) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          inputUrl,
        }),
      });

      if (!response.ok) throw new Error("Failed to create project");

      const data = await response.json();
      router.push(`/(tabs)/project/${data.project.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  if (selectedType) {
    const selected = contentTypes.find((t) => t.id === selectedType);
    const Icon = selected.icon;

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
            {/* Back button */}
            <TouchableOpacity
              onPress={() => setSelectedType(null)}
              style={{ marginBottom: 20 }}
            >
              <Text
                style={{ color: "#00FFA3", fontSize: 16, fontWeight: "600" }}
              >
                ← Back
              </Text>
            </TouchableOpacity>

            {/* Header */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: `${selected.color}20`,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Icon color={selected.color} size={40} />
            </View>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#FFFFFF",
                marginBottom: 8,
              }}
            >
              {selected.title} Project
            </Text>
            <Text style={{ fontSize: 16, color: "#9CA3AF", marginBottom: 32 }}>
              {selected.description}
            </Text>

            {/* URL Input */}
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 8,
                }}
              >
                Enter URL
              </Text>
              <View
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: url ? selected.color : "#2A2A3E",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                }}
              >
                <Link2 color="#9CA3AF" size={20} />
                <TextInput
                  value={url}
                  onChangeText={setUrl}
                  placeholder="https://youtube.com/watch?v=..."
                  placeholderTextColor="#6B7280"
                  style={{
                    flex: 1,
                    color: "#FFFFFF",
                    fontSize: 16,
                    paddingVertical: 16,
                    paddingLeft: 12,
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Submit URL Button */}
            <TouchableOpacity
              onPress={handleSubmitUrl}
              disabled={loading || !url.trim()}
              style={{
                backgroundColor: url.trim() ? selected.color : "#2A2A3E",
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: url.trim() ? "#0A0A0F" : "#6B7280",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {loading ? "Processing..." : "Analyze URL"}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#2A2A3E" }}
              />
              <Text
                style={{ color: "#6B7280", marginHorizontal: 16, fontSize: 14 }}
              >
                OR
              </Text>
              <View
                style={{ flex: 1, height: 1, backgroundColor: "#2A2A3E" }}
              />
            </View>

            {/* Upload File Button */}
            <TouchableOpacity
              onPress={handleUploadFile}
              disabled={loading}
              style={{
                backgroundColor: "#1A1A2E",
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selected.color,
                borderStyle: "dashed",
                paddingVertical: 32,
                alignItems: "center",
              }}
            >
              <Upload
                color={selected.color}
                size={40}
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
                Upload File
              </Text>
              <Text style={{ color: "#9CA3AF", fontSize: 14 }}>
                Tap to select from your device
              </Text>
            </TouchableOpacity>

            {/* Error */}
            {error && (
              <View
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  borderRadius: 12,
                  padding: 16,
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: "#FF0000",
                }}
              >
                <Text style={{ color: "#FF6B6B", fontSize: 14 }}>{error}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

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
              backgroundColor: "rgba(0, 255, 163, 0.2)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Sparkles color="#00FFA3" size={40} />
          </View>

          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 8,
            }}
          >
            Create Project
          </Text>
          <Text style={{ fontSize: 16, color: "#9CA3AF", marginBottom: 32 }}>
            Choose content type to get started
          </Text>

          {/* Content Types */}
          {contentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelectedType(type.id)}
                style={{
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 16,
                  borderWidth: 2,
                  borderColor: type.color,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    backgroundColor: `${type.color}20`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon color={type.color} size={32} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 20,
                      fontWeight: "700",
                      marginBottom: 4,
                    }}
                  >
                    {type.title}
                  </Text>
                  <Text style={{ color: "#9CA3AF", fontSize: 14 }}>
                    {type.description}
                  </Text>
                </View>

                <Text style={{ color: type.color, fontSize: 24 }}>→</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
