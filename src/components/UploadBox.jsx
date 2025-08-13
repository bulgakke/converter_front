import React, { useState, useCallback } from "react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function UploadBox() {
  const [isUploading, setIsUploading] = useState(false)

  const handleFiles = useCallback(async (files) => {
    if (!files.length) return

    const file = files[0]
    if (file.type !== "image/svg+xml") {
      alert("Please select an SVG file.")
      return
    }

    const text = await file.text()
    setIsUploading(true)

    try {
      const res = await fetch(`${API_BASE_URL}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ svg_content: text })
      })

      const data = await res.json()

      if (!res.ok) {
        const err = data.errors.svg_content
        throw new Error(err)
      }

      if (data.pdf_url) {
        window.open(data.pdf_url, "_blank")
      } else {
        alert("Unexpected error")
      }
    } catch (err) {
      alert(`Upload failed: ${err.message}`)
    } finally {
      setIsUploading(false)
    }
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  const handleSelect = (e) => {
    handleFiles(e.target.files)
  }

  return (
    <div>
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          display: "block",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        {isUploading ? "Uploading..." : "Drag & Drop SVG here or click to select"}
        <input
          type="file"
          accept=".svg"
          style={{ display: "none" }}
          onChange={handleSelect}
        />
      </label>
    </div>
  )
}
