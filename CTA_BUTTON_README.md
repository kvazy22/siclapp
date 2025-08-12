# Customizable Call to Action (CTA) Button & Profile Button

## Overview

This feature adds fully customizable Call to Action and Profile buttons to the hero section of your website. Both buttons' text, styling, and visibility can be controlled dynamically from the admin panel.

## Features

### ✅ **Dynamic Configuration**
- **Enable/Disable**: Toggle button visibility on/off for both CTA and Profile buttons
- **Bilingual Support**: Separate text for English and Arabic
- **Custom URL**: Link to any page or section (CTA button)
- **Icon Selection**: Choose from Remix Icons for both buttons
- **Style Options**: Primary, Secondary, or Outline styles (CTA button)
- **Target Control**: Open in same window or new tab (CTA button)

### ✅ **Admin Panel Integration**
- **Content Manager**: Full configuration interface for both buttons
- **Live Preview**: See button appearance in real-time
- **Easy Management**: User-friendly form controls
- **Persistent Storage**: Settings saved to JSON file

### ✅ **Responsive Design**
- **Mobile Friendly**: Adapts to different screen sizes
- **Language Aware**: Automatically switches based on current language
- **Consistent Styling**: Matches website design system

## How to Use

### 1. Access Admin Panel
Navigate to `/admin` in your browser and log in to access the admin panel.

### 2. Configure Buttons
1. Go to the **Content** tab in the admin panel
2. Scroll down to the **Call to Action Button** section
3. Check "Enable CTA Button" to activate the feature
4. Configure the following settings:

#### CTA Button Settings
- **Button Text (English)**: Text displayed in English
- **Button Text (Arabic)**: Text displayed in Arabic
- **Button URL**: Where the button links to
- **Button Icon**: Remix Icon class name
- **Button Style**: Primary, Secondary, or Outline
- **Open In**: Same window or new tab

#### Profile Button Settings
5. Scroll down to the **Profile Button** section
6. Check "Enable Profile Button" to activate the feature
7. Configure the following settings:
- **Button Text (English)**: Text displayed in English
- **Button Text (Arabic)**: Text displayed in Arabic
- **Button Icon**: Remix Icon class name

### 3. Save Changes
Click "Update Content" to save your button configurations.

## Icon Suggestions

Popular Remix Icons you can use:
- `ri-phone-line` - Phone icon
- `ri-mail-line` - Email icon
- `ri-calendar-line` - Calendar icon
- `ri-arrow-right-line` - Arrow icon
- `ri-download-line` - Download icon
- `ri-external-link-line` - External link icon
- `ri-chat-line` - Chat icon

## URL Examples

### Same Page Links
- `#contact` - Links to contact section
- `#services` - Links to services section
- `#about` - Links to about section

### External Links
- `https://example.com` - External website
- `tel:+966501234567` - Phone number
- `mailto:info@example.com` - Email address

## Technical Implementation

### Files Created/Modified

1. **API Endpoint**: `app/api/content/route.ts`
   - Handles content storage and retrieval
   - JSON file-based storage
   - Includes CTA and Profile button settings

2. **CTA Component**: `components/CTAButton.tsx`
   - Reusable CTA button component
   - Dynamic content loading
   - Responsive design

3. **Profile Component**: `components/ProfileButton.tsx`
   - Reusable Profile button component
   - Dynamic content loading
   - PDF viewer integration

4. **Admin Interface**: `components/admin/ContentManager.tsx`
   - CTA and Profile configuration forms
   - Live preview functionality
   - Form validation

5. **Hero Section**: `components/Hero.tsx`
   - Integrated CTA and Profile buttons
   - Dynamic content loading
   - Language support

### Data Structure

The button settings are stored in `data/content.json`:

```json
{
  "cta_enabled": true,
  "cta_text_en": "Get Quote",
  "cta_text_ar": "احصل على عرض سعر",
  "cta_url": "#contact",
  "cta_icon": "ri-phone-line",
  "cta_style": "primary",
  "cta_target": "_self",
  "profile_enabled": true,
  "profile_text_en": "Our Profile",
  "profile_text_ar": "ملفنا التعريفي",
  "profile_icon": "ri-book-open-line"
}
```

## Benefits

### For Administrators
- **No Code Changes**: Update button without touching code
- **Instant Updates**: Changes appear immediately
- **A/B Testing**: Easy to test different CTAs
- **Campaign Management**: Adapt button for different campaigns

### For Users
- **Consistent Experience**: Button matches website design
- **Language Support**: Proper localization
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized loading and rendering

## Troubleshooting

### Button Not Appearing
1. Check if CTA is enabled in admin panel
2. Verify content API is working (`/api/content`)
3. Check browser console for errors

### Styling Issues
1. Ensure Remix Icons are loaded
2. Check CSS classes are applied correctly
3. Verify responsive breakpoints

### Language Issues
1. Confirm language context is passed correctly
2. Check Arabic text encoding
3. Verify RTL support if needed

## Future Enhancements

Potential improvements for the CTA button system:

- **Analytics Integration**: Track button clicks
- **A/B Testing**: Multiple CTA variants
- **Scheduling**: Show/hide based on time/date
- **Geolocation**: Different CTAs for different regions
- **User Segmentation**: Personalized CTAs
- **Animation Options**: Hover effects and transitions

## Support

For technical support or questions about the CTA button feature, please refer to the main project documentation or contact the development team. 