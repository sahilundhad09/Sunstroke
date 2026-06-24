const CONVERTKIT_API_URL = "https://api.kit.com/v4";

interface ConvertKitSubscriberResponse {
  subscriber?: {
    id: number;
    email_address: string;
  };
}

export async function addSubscriberToConvertKit(
  email: string,
  name?: string
): Promise<{ success: boolean; subscriberId?: string; error?: string }> {
  const apiSecret = process.env.CONVERTKIT_API_SECRET;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiSecret || !formId) {
    console.warn("ConvertKit credentials not configured. Skipping...");
    return { success: true }; // Don't fail if ConvertKit isn't set up yet
  }

  try {
    const response = await fetch(
      `${CONVERTKIT_API_URL}/forms/${formId}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiSecret,
        },
        body: JSON.stringify({
          email,
          ...(name && { first_name: name }),
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("ConvertKit API error:", errorData);
      return { success: false, error: "Failed to add subscriber to ConvertKit" };
    }

    const data: ConvertKitSubscriberResponse = await response.json();
    return {
      success: true,
      subscriberId: data.subscriber?.id?.toString(),
    };
  } catch (error) {
    console.error("ConvertKit error:", error);
    return { success: false, error: "ConvertKit connection failed" };
  }
}
