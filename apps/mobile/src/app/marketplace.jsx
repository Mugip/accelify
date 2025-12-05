import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Sparkles,
  Video,
  Type,
  Music,
  Image as ImageIcon,
  Download,
  Crown,
} from "lucide-react-native";

export default function MarketplaceScreen() {
  const insets = useSafeAreaInsets();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All", icon: Sparkles },
    { id: "video", label: "Videos", icon: Video },
    { id: "captions", label: "Captions", icon: Type },
    { id: "music", label: "Music", icon: Music },
    { id: "graphics", label: "Graphics", icon: ImageIcon },
  ];

  const mockTemplates = [
    {
      id: 1,
      name: "Neon Kinetic Captions",
      type: "captions",
      price: 0,
      preview: "🎬",
      color: "#00FFA3",
      downloads: 1234,
    },
    {
      id: 2,
      name: "MrBeast Zoom Pack",
      type: "video",
      price: 4.99,
      preview: "🎥",
      color: "#6B5BFF",
      downloads: 892,
    },
    {
      id: 3,
      name: "Viral Hooks Bundle",
      type: "captions",
      price: 2.99,
      preview: "💬",
      color: "#FF00CC",
      downloads: 2103,
    },
    {
      id: 4,
      name: "Trending Music Pack",
      type: "music",
      price: 9.99,
      preview: "🎵",
      color: "#FFD700",
      downloads: 456,
    },
    {
      id: 5,
      name: "Gen-Z Text Styles",
      type: "captions",
      price: 0,
      preview: "✨",
      color: "#00FFA3",
      downloads: 3421,
    },
    {
      id: 6,
      name: "Reels Transitions",
      type: "video",
      price: 7.99,
      preview: "🔀",
      color: "#6B5BFF",
      downloads: 678,
    },
  ];

  useEffect(() => {
    // Simulate loading templates
    setTimeout(() => {
      setTemplates(mockTemplates);
      setLoading(false);
    }, 500);
  }, []);

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "all" || template.type === selectedCategory;
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            marginBottom: 16,
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
              style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF" }}
            >
              Template Marketplace
            </Text>
            <Text style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
              Premium templates for creators
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: "#1A1A2E",
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            borderWidth: 2,
            borderColor: searchQuery ? "#00FFA3" : "#2A2A3E",
          }}
        >
          <Search color="#9CA3AF" size={20} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search templates..."
            placeholderTextColor="#6B7280"
            style={{
              flex: 1,
              color: "#FFFFFF",
              fontSize: 16,
              paddingVertical: 14,
              paddingLeft: 12,
            }}
          />
        </View>
      </View>

      {/* Categories */}
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
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: isActive ? "#00FFA320" : "#1A1A2E",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: isActive ? "#00FFA3" : "transparent",
                marginRight: 8,
              }}
            >
              <Icon color={isActive ? "#00FFA3" : "#6B7280"} size={18} />
              <Text
                style={{
                  color: isActive ? "#00FFA3" : "#6B7280",
                  marginLeft: 8,
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Templates Grid */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 20,
              padding: 40,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#9CA3AF" }}>Loading templates...</Text>
          </View>
        ) : filteredTemplates.length === 0 ? (
          <View
            style={{
              backgroundColor: "#1A1A2E",
              borderRadius: 20,
              padding: 40,
              alignItems: "center",
            }}
          >
            <Sparkles color="#6B5BFF" size={48} style={{ marginBottom: 12 }} />
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
              No templates found
            </Text>
            <Text style={{ color: "#9CA3AF", fontSize: 14, marginTop: 4 }}>
              Try a different search
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {filteredTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={{
                  width: "48%",
                  backgroundColor: "#1A1A2E",
                  borderRadius: 20,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: template.color,
                }}
              >
                {/* Preview */}
                <View
                  style={{
                    aspectRatio: 1,
                    backgroundColor: `${template.color}20`,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 56 }}>{template.preview}</Text>
                </View>

                {/* Info */}
                <View style={{ padding: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    {template.price === 0 ? (
                      <View
                        style={{
                          backgroundColor: "#00FFA320",
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 6,
                        }}
                      >
                        <Text
                          style={{
                            color: "#00FFA3",
                            fontSize: 10,
                            fontWeight: "700",
                          }}
                        >
                          FREE
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: "#FFD70020",
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 6,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Crown
                          color="#FFD700"
                          size={10}
                          style={{ marginRight: 4 }}
                        />
                        <Text
                          style={{
                            color: "#FFD700",
                            fontSize: 10,
                            fontWeight: "700",
                          }}
                        >
                          ${template.price}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 14,
                      fontWeight: "600",
                      marginBottom: 4,
                    }}
                    numberOfLines={2}
                  >
                    {template.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Download color="#9CA3AF" size={12} />
                    <Text
                      style={{ color: "#9CA3AF", fontSize: 11, marginLeft: 4 }}
                    >
                      {template.downloads.toLocaleString()}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: template.color,
                      borderRadius: 10,
                      paddingVertical: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#0A0A0F",
                        fontSize: 13,
                        fontWeight: "700",
                      }}
                    >
                      {template.price === 0 ? "USE" : "GET"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
