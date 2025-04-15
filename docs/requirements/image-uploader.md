# Image Uploader Requirements

## Overview

This document outlines the requirements for implementing a file upload system with a focus on image uploading functionality. The system will allow users to upload, manage, and access images within the application using Next.js and Amazon S3 for storage.

## Functional Requirements

### Core Functionality

- [x] Users must be able to upload images from their device
- [x] Support for single and multiple image uploads
- [x] Preview images before finalizing upload
- [x] Progress indication during upload process
- [ ] Allow upload cancellation
- [x] Support for drag-and-drop interface
- [x] Support for clipboard paste functionality

### Image Management

- [x] View uploaded images in a gallery/list view
- [ ] Delete uploaded images
- [ ] Replace/update existing images
- [ ] Add metadata to images (alt text)
- [ ] Search/filter images by metadata

### Image Processing

- [x] Automatic image resizing and optimization (using nextjs image component)
- [x] Generate thumbnails for previews
- [x] Support for common image formats (JPEG, PNG, WebP, GIF)
- [x] Maximum file size constraints (configurable)
- [ ] Maintain EXIF data when relevant

## Technical Requirements

### Frontend Implementation

- [x] Utilize the existing `FileUpload` component from `src/components/ui/file-upload.tsx` for the UI
- [x] Implement as Server Components where possible, using `"use client"` only when necessary
- [x] Create wrapper components that connect the `FileUpload` components to S3 operations
- [x] Integrate with Shadcn UI and Radix UI for consistent design
- [x] Responsive design using Tailwind CSS (mobile-first approach using container queries)
- [ ] Design responsive accessible according to WCAG 2.1 AA standards

### Component Integration

- [x] Implement custom hooks to connect `FileUpload` with S3 operations
- [x] Use the `onUpload` callback to handle S3 presigned URL generation and uploads
- [x] Create utility functions to handle various component events (onFileAccept, onFileReject, etc.)
- [x] Implement progress tracking using the component's built-in progress indicators
- [x] Add custom validation to ensure only allowed image types are uploaded

### Backend Implementation

- [x] Implement secure upload endpoints using Next.js Server Actions
- [x] Direct S3 integration through presigned URLs for secure client-side uploads
- [x] Implement S3 bucket configuration with appropriate CORS settings
- [x] Set up proper IAM roles and policies for S3 access
- [x] Create utility functions for S3 operations (upload, delete, update)
- [ ] Implement fallback local storage for development environment
- [x] Create database schema for tracking uploaded files and their S3 locations
- [x] Implement proper error handling and validation
- [ ] Rate limiting to prevent abuse

### Amazon S3 Configuration

- [x] Set up S3 bucket with appropriate region selection
- [x] Configure bucket policies for secure public/private access
- [ ] Implement lifecycle rules for cost optimization
- [x] Configure CORS to allow uploads from application domain
- [x] Set up proper content-type detection
- [ ] Implement optional CDN integration (CloudFront) for improved delivery
- [x] Configure server-side encryption for stored images

### Database Schema

- [x] Extend the database schema in `src/server/db/schema.ts`
- [x] Create tables for images with appropriate relations
- [x] Store metadata including:
  - [x] Original filename
  - [x] File size
  - [x] MIME type
  - [x] Dimensions
  - [x] Upload date
  - [x] User association (if applicable)
  - [ ] Public/private status
  - [ ] Custom metadata fields
  - [x] S3 object key
  - [x] S3 bucket location
  - [ ] CDN URL (if applicable)

## UI/UX Requirements

- [x] Utilize the built-in drag-and-drop interface from `FileUpload` component
- [x] Leverage the component's progress indicators for clear visual feedback
- [x] Implement appropriate error states using the component's error handling
- [x] Create consistent loading states with appropriate fallbacks
- [x] Ensure the component styling aligns with the application style guide
- [ ] Verify accessibility compatibility of the component (keyboard navigation, screen readers)

## Security Requirements

- [x] Validate file types on both client and server
- [x] Generate secure, non-guessable S3 object keys
- [x] Use temporary presigned URLs for uploads with expiration
- [x] Implement proper S3 bucket policies to prevent public access when not needed
- [x] Sanitize filenames to prevent path traversal attacks
- [x] Implement CSRF protection
- [ ] Scan uploads for malware (if applicable)
- [x] Properly authenticate and authorize users for upload actions
- [x] Implement appropriate content policies

## Performance Requirements

- [ ] Optimize images for web delivery using Next.js Image component
- [ ] Configure S3 transfer acceleration for faster uploads when needed
- [ ] Implement lazy loading for image galleries
- [ ] Use WebP format when supported by browser
- [ ] Configure proper cache headers for S3 objects
- [x] Minimize client-side JavaScript with server components when possible
- [ ] Implement efficient pagination for large image collections

## Next.js Specific Implementation

- [x] Use Next.js 15+ App Router architecture
- [ ] Leverage Next.js Image component for optimized image delivery
- [x] Implement Server Actions for secure direct-to-S3 uploads
- [x] Use React Server Components where possible to reduce client bundle
- [ ] Implement error boundaries for upload failure scenarios
- [x] Create reusable hooks for upload state management
- [ ] Optimize for Next.js build and deployment pipeline

## Acceptance Criteria

- [x] Users can upload images using drag-and-drop or file picker
- [x] Upload progress is clearly displayed
- [x] Images are properly stored and retrievable from S3
- [x] S3 bucket is properly configured with appropriate security settings
- [ ] All image management functions work as expected
- [x] UI is responsive across device sizes
- [ ] Accessibility requirements are met
- [ ] Performance benchmarks are achieved
- [x] Security validations pass
- [ ] Next.js Image component properly optimizes and serves images

## Implementation Phases

1. [x] S3 bucket setup and configuration
2. [x] Core upload functionality with Next.js Server Actions and S3 integration
3. [ ] Image processing and optimization
4. [x] Gallery view and management features
5. [ ] Advanced features (batch operations, metadata editing)
6. [ ] CDN integration and performance optimization
