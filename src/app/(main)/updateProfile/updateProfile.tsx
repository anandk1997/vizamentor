"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useGetSession } from "@/hooks/useGetSession";
import { redirect } from "next/navigation";
import { UpdatePassword } from "./updatePassword";
import { useGetToken } from "@/hooks/useGetToken";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Camera,
  Image as ImageIcon,
} from "lucide-react";

export function UpdateProfile() {
  const { data: session, isPending } = useGetSession();
  const tokenConfig = useGetToken();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Profile, 1 = Password

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Avatar
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!session?.session) return;
    setFormData({
      name: session?.name ?? "",
      email: session?.email ?? "",
      phone: session?.phone ?? "",
      address: session?.address ?? "",
    });

    if ((session as any)?.avatarUrl)
      setAvatarPreview((session as any).avatarUrl);
  }, [
    session?.session,
    session?.name,
    session?.email,
    session?.phone,
    session?.address,
    (session as any)?.avatarUrl,
  ]);

  // keyboard nav for tabs
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveTab((t) => (t + 1) % 2);
      if (e.key === "ArrowLeft") setActiveTab((t) => (t + 2 - 1) % 2);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const onAvatarSelect = async (file?: File) => {
    const f = file ?? fileInputRef.current?.files?.[0] ?? null;
    if (!f) return;
    setAvatarFile(f);
    try {
      const b64 = await fileToBase64(f);
      setAvatarPreview(b64);
    } catch (err) {
      console.error("avatar preview error", err);
      toast.error("Unable to preview avatar");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleDrop = async (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setDragging(false);
    if (!ev.dataTransfer.files?.length) return;
    const file = ev.dataTransfer.files[0];
    await onAvatarSelect(file);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSaved(false);

    try {
      let avatarBase64: string | undefined;
      if (avatarFile) avatarBase64 = await fileToBase64(avatarFile);

      const payload: any = { ...formData, id: session?.id };
      if (avatarBase64) payload.avatarBase64 = avatarBase64;

      const { data } = await axios.patch(
        "/api/users/update",
        payload,
        tokenConfig,
      );
      toast.success(data?.message ?? "Profile updated");
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (error: any) {
      console.error("Update User error", error);
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPending && !session?.session) redirect("/");

  const labelClass = (fieldName: string) => {
    const hasValue = Boolean((formData as any)[fieldName]);
    const isFocused = focusedField === fieldName;
    const base =
      "pointer-events-none absolute left-10 transition-all duration-150 origin-left";
    if (isFocused || hasValue) return `${base} top-1 text-xs text-indigo-600`;
    return `${base} top-4 text-sm text-slate-500`;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl bg-white/80 backdrop-blur-md border border-gray-100 p-1 shadow-lg">
          {/* Tabs header */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-bold text-slate-800">Account</h2>

              <div
                role="tablist"
                aria-label="Account tabs"
                className="relative"
              >
                <div className="flex bg-transparent rounded-xl overflow-hidden">
                  <button
                    role="tab"
                    aria-selected={activeTab === 0}
                    onClick={() => setActiveTab(0)}
                    className={`relative z-10 px-4 py-2 rounded-xl text-sm font-medium transition ${
                      activeTab === 0
                        ? "text-indigo-700"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Profile
                  </button>

                  <button
                    role="tab"
                    aria-selected={activeTab === 1}
                    onClick={() => setActiveTab(1)}
                    className={`relative z-10 px-4 py-2 rounded-xl text-sm font-medium transition ${
                      activeTab === 1
                        ? "text-indigo-700"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Password
                  </button>
                </div>

                {/* animated underline */}
                <div className="absolute left-0 right-0 top-full mt-1">
                  <div className="relative h-0">
                    <div
                      aria-hidden
                      className={`mx-0 w-1/2 transition-transform duration-300 ease-out transform ${
                        activeTab === 0 ? "translate-x-0" : "translate-x-full"
                      }`}
                    >
                      <div className="h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {saved ? (
                <div className="inline-flex items-center gap-2 text-green-600 font-medium">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Saved
                </div>
              ) : (
                <div className="text-sm text-slate-500">Changes not saved</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 pb-6">
            {/* Left column: avatar + meta */}
            <aside className="lg:col-span-1">
              <div className="rounded-2xl bg-white p-5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-purple-50 border ${dragging ? "ring-4 ring-indigo-200" : "border-gray-200"}`}
                  >
                    {avatarPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarPreview}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-indigo-600">
                        <User size={28} />
                        <span className="text-xs mt-1">No avatar</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      {formData.name || "Your name"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {session?.email}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border border-gray-100 bg-white hover:shadow-sm"
                      >
                        <Camera size={14} />
                        <span>Change</span>
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) await onAvatarSelect(f);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  className={`mt-4 rounded-md border-2 border-dashed px-3 py-2 text-center text-sm ${dragging ? "border-indigo-300 bg-indigo-50/40" : "border-gray-100"}`}
                >
                  <div className="flex items-center justify-center gap-2 text-slate-500">
                    <ImageIcon size={16} />
                    <span>Drag & drop a photo, or click Change</span>
                  </div>
                </div>

                <div className="mt-4 text-xs text-slate-500">
                  <div>Member</div>
                  <div className="mt-1">
                    Last updated:{" "}
                    {session && (session as any)?.updatedAt
                      ? new Date(
                          (session as any).updatedAt,
                        ).toLocaleDateString()
                      : "—"}
                  </div>
                </div>
              </div>
            </aside>

            {/* Right column: tab panels (span 2 columns on lg) */}
            <section className="lg:col-span-2">
              {/* Profile Panel */}
              <div
                role="tabpanel"
                aria-hidden={activeTab !== 0}
                className={`${activeTab === 0 ? "block" : "hidden"}`}
              >
                <form
                  onSubmit={handleUpdate}
                  className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Profile
                      </h3>
                      <p className="text-sm text-slate-500">
                        Edit personal info
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-white font-semibold transition ${isLoading ? "bg-indigo-500/90 cursor-wait" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02]"}`}
                      >
                        {isLoading ? (
                          <svg
                            className="w-4 h-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M12 2v4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : null}
                        <span>{isLoading ? "Saving..." : "Save changes"}</span>
                      </button>

                      <Link
                        href="/"
                        className="text-sm text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="relative">
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() =>
                          setFocusedField((prev) =>
                            prev === "name" ? null : prev,
                          )
                        }
                        placeholder=""
                        className="h-12 w-full px-4 pt-5 pb-1 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                      />
                      <label className={labelClass("name")}>Full name</label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <Mail size={16} />
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() =>
                          setFocusedField((prev) =>
                            prev === "email" ? null : prev,
                          )
                        }
                        placeholder=""
                        className="h-12 w-full pl-10 pr-4 pt-5 pb-1 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                        required
                      />
                      <label className={labelClass("email")}>Email</label>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <Phone size={16} />
                      </div>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() =>
                          setFocusedField((prev) =>
                            prev === "phone" ? null : prev,
                          )
                        }
                        placeholder=""
                        className="h-12 w-full pl-10 pr-4 pt-5 pb-1 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
                        required
                      />
                      <label className={labelClass("phone")}>Phone</label>
                    </div>

                    {/* Address */}
                    <div className="relative md:col-span-2">
                      <div className="absolute left-3 top-3 text-slate-400">
                        <MapPin size={16} />
                      </div>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("address")}
                        onBlur={() =>
                          setFocusedField((prev) =>
                            prev === "address" ? null : prev,
                          )
                        }
                        placeholder=""
                        rows={3}
                        className="min-h-[72px] w-full pl-10 pr-4 pt-5 pb-1 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition resize-none"
                        required
                      />
                      <label className={labelClass("address")}>Address</label>
                    </div>
                  </div>
                </form>
              </div>

              {/* Password Panel */}
              <div
                role="tabpanel"
                aria-hidden={activeTab !== 1}
                className={`${activeTab === 1 ? "block" : "hidden"}`}
              >
                <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Password
                      </h3>
                      <p className="text-sm text-slate-500">
                        Change your password securely
                      </p>
                    </div>
                  </div>

                  {/* Reuse your UpdatePassword component */}
                  <UpdatePassword />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
