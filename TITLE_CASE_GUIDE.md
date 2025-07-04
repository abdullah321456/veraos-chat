# Title Case Styling Guide

This guide explains the title case styling system implemented in the application to ensure consistent capitalization across all text elements.

## Overview

The title case system ensures that the first letter of every word is capitalized and the rest is lowercase, providing a consistent and professional appearance throughout the application.

## Implementation

### 1. Utility Functions

Located in `src/lib/utils/title-case.ts`:

- `toTitleCase(text: string)`: Basic title case conversion
- `toEnhancedTitleCase(text: string)`: Enhanced title case with better single word handling
- `toProperTitleCase(text: string)`: Title case with proper article handling
- `useTitleCase(text: string)`: React hook for basic title case
- `useEnhancedTitleCase(text: string)`: React hook for enhanced title case
- `useProperTitleCase(text: string)`: React hook for proper title case

### 2. React Component

Located in `src/components/atom/title-case-text.tsx`:

```tsx
import { TitleCaseText } from '@/components/atom/title-case-text';

// Basic usage
<TitleCaseText>hello world</TitleCaseText>
// Output: "Hello World"

// With proper title case (handles articles)
<TitleCaseText variant="proper">the quick brown fox</TitleCaseText>
// Output: "The Quick Brown Fox"

// As different HTML elements
<TitleCaseText as="h1">page title</TitleCaseText>
```

### 3. CSS Classes

Located in `src/app/globals.css`:

- `.title-case`: Utility class for title case styling
- `.no-title-case`: Override to disable title case
- `.title-case-js`: For JavaScript-processed title case

## Automatic Integration

The following components automatically apply title case to their text content:

### Form Components
- **Input**: Labels are automatically converted to title case
- **Textarea**: Labels are automatically converted to title case
- **Select**: Labels and option names are automatically converted to title case
- **Button**: Button text is automatically converted to title case

### Report Components
- **Response Details**: Names are automatically converted to title case
- **Full Report**: Names and labels are automatically converted to title case
- **Personal Info**: Name fields are automatically converted to title case

### Usage Examples

```tsx
// Input component - label automatically becomes title case
<Input label="email address" placeholder="Enter your email" />
// Label displays as: "Email Address"

// Button component - text automatically becomes title case
<Button>save changes</Button>
// Button text displays as: "Save Changes"

// Select component - label and options automatically become title case
<Select 
  label="organization type" 
  options={[
    { id: '1', name: 'government agency', value: 'government' },
    { id: '2', name: 'private corporation', value: 'private' }
  ]}
/>
// Label displays as: "Organization Type"
// Options display as: "Government Agency", "Private Corporation"

// Name display - automatically becomes title case
// Input: "joshua" → Output: "Joshua"
// Input: "JOSHUA" → Output: "Joshua"
// Input: "joshua doe smith" → Output: "Joshua Doe Smith"
```

## Manual Usage

### Using the Utility Function

```tsx
import { toEnhancedTitleCase } from '@/lib/utils/title-case';

const title = toEnhancedTitleCase('hello world'); // "Hello World"
const name = toEnhancedTitleCase('joshua'); // "Joshua"
const properTitle = toProperTitleCase('the quick brown fox'); // "The Quick Brown Fox"
```

### Using the React Hook

```tsx
import { useEnhancedTitleCase } from '@/lib/utils/title-case';

function MyComponent() {
  const title = useEnhancedTitleCase('hello world');
  return <h1>{title}</h1>; // "Hello World"
}
```

### Using the TitleCaseText Component

```tsx
import { TitleCaseText } from '@/components/atom/title-case-text';

function MyComponent() {
  return (
    <div>
      <TitleCaseText as="h1">welcome to our application</TitleCaseText>
      <TitleCaseText variant="proper">the best solution for your needs</TitleCaseText>
    </div>
  );
}
```

## Enhanced Title Case Function

The `toEnhancedTitleCase` function provides better handling for:

- **Single words**: "joshua" → "Joshua"
- **Multiple words**: "john doe smith" → "John Doe Smith"
- **Mixed case**: "JOSHUA" → "Joshua"
- **Whitespace handling**: "  joshua  " → "Joshua"
- **Empty strings**: "" → ""

## Exceptions and Overrides

### Elements That Don't Use Title Case

The following elements are excluded from title case styling:

- Email addresses (`input[type="email"]`)
- URLs (`input[type="url"]`, `a[href^="http"]`)
- Code elements (`code`, `pre`, `.code`, `.technical`)
- Elements with `.no-title-case` class

### Override Title Case

```tsx
// Disable title case for specific elements
<span className="no-title-case">this text won't be title case</span>

// For email inputs
<input type="email" placeholder="user@example.com" />
// Placeholder remains as-is
```

## Best Practices

1. **Use the automatic integration** for form components - they handle title case automatically
2. **Use `TitleCaseText` component** for headings and important text
3. **Use `toEnhancedTitleCase`** for single words and names
4. **Use utility functions** for dynamic content or complex scenarios
5. **Don't manually capitalize** text in your code - let the system handle it
6. **Use proper title case** for headings and titles, enhanced title case for names

## Examples

### Before (Inconsistent)
```tsx
<Input label="Email Address" />
<Button>SAVE CHANGES</Button>
<Select label="organization type" />
<h1>welcome to our app</h1>
<p>joshua doe smith</p>
```

### After (Consistent)
```tsx
<Input label="email address" /> {/* Automatically becomes "Email Address" */}
<Button>save changes</Button> {/* Automatically becomes "Save Changes" */}
<Select label="organization type" /> {/* Automatically becomes "Organization Type" */}
<TitleCaseText as="h1">welcome to our app</TitleCaseText> {/* "Welcome To Our App" */}
<TitleCaseText>joshua doe smith</TitleCaseText> {/* "Joshua Doe Smith" */}
```

## Migration Guide

To update existing code:

1. **Remove manual capitalization** from component props
2. **Replace hardcoded capitalized text** with lowercase text
3. **Use `TitleCaseText` component** for headings and titles
4. **Add `.no-title-case` class** to elements that shouldn't be title case
5. **Use `toEnhancedTitleCase`** for single words and names

The system will automatically handle the capitalization, ensuring consistency across the entire application. 