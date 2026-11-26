type ReadSetting = {
  _id: string;
  numberphone: string;
  slug: string;
  createdAt?: string;
  notificationDiscord: boolean;
};

type ApiResponse = {
  success: boolean;
  result: ReadSetting[];
  message: string;
};
type NextFetchRequestConfig = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export default async function readSettingApi(): Promise<ApiResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL ?? "https://api.goixegiare.pro.vn"}/api/setting/read/all`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1800,
        tags: ["settings"],
      },
    } satisfies NextFetchRequestConfig);

    if (!response.ok) {
      throw new Error(`Lỗi API: ${response.status}`);
    }

    return response.json();
  } catch (error: unknown) {
    return {
      success: false,
      result: [],
      message: error instanceof Error ? error.message : "Đã xảy ra lỗi",
    };
  }
}
// export default async function readSettingApi(): Promise<ApiResponse> {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_API_URL ?? "https://api.goixegiare.pro.vn"}/api/setting/read/all`;

//     const response = await fetch(url, {
//       next: { revalidate: 1800, tags: ["settings"] }, // 30 phút
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Lỗi API: ${response.status}`);
//     }

//     // Backend trả về { result, success, message }
//     const res: ApiResponse = await response.json();
//     return res;
//   } catch (error: unknown) {
//     console.error("Lỗi API:", error);
//     const err = error as { message?: string };
//     return {
//       success: false,
//       result: [],
//       message: err.message || "Đã xảy ra lỗi",
//     };
//   }
// }
