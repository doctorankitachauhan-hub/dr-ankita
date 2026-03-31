import axios from "axios";

type CloudinarySignature = {
    signature: string;
    timestamp: number;
    folder: string;
    cloudName: string;
    apiKey: string;
};

export type CloudinaryUploadResult = {
    secure_url: string;
    public_id: string;
    format: string;
    bytes: number;
};

export async function getUploadSignature(): Promise<CloudinarySignature> {
    const res = await axios.get("/api/v1/user/upload-signature", {
        withCredentials: true
    });

    return res.data
}

export async function uploadToCloudinary(file: File, sig: CloudinarySignature): Promise<CloudinaryUploadResult> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", sig.apiKey);
    formData.append("timestamp", String(sig.timestamp));
    formData.append("signature", sig.signature);
    formData.append("folder", sig.folder);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`,
        { method: "POST", body: formData }
    );

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || "Cloudinary upload failed");
    }

    return res.json();
}