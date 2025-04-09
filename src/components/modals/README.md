# Dialog Component Documentation

A flexible, accessible, and responsive dialog component built with React, Tailwind CSS, Framer Motion, and TanStack Query integration.

## Features

- 🎨 Fully customizable with Tailwind CSS
- 🔄 Seamless TanStack Query integration
- 🎭 Smooth animations with Framer Motion
- ♿ Accessible using Headless UI
- 📱 Responsive design
- 🌗 Dark mode support
- 🎛️ Multiple size and position variants
- 🔒 TypeScript support

## Installation

Ensure you have the required dependencies:

```bash
npm install @headlessui/react framer-motion @tanstack/react-query react-icons
```

## Basic Usage

```tsx
import { Dialog } from "./components/modals/dialog";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      header="Dialog Title"
    >
      <div>Your content here</div>
    </Dialog>
  );
}
```

## Props

| Prop                | Type                                   | Default   | Description                              |
| ------------------- | -------------------------------------- | --------- | ---------------------------------------- |
| isOpen              | boolean                                | required  | Controls dialog visibility               |
| onClose             | () => void                             | required  | Function called when dialog should close |
| children            | React.ReactNode                        | required  | Content to render inside dialog          |
| className           | string                                 | ""        | Additional classes for the dialog        |
| size                | "sm" \| "md" \| "lg" \| "xl" \| "full" | "md"      | Dialog width variant                     |
| position            | "center" \| "top" \| "bottom"          | "center"  | Vertical positioning                     |
| animation           | "fade" \| "slide" \| "scale"           | "fade"    | Animation variant                        |
| customTransition    | { duration?: number; ease?: string }   | undefined | Custom animation settings                |
| queryResult         | UseQueryResult                         | undefined | TanStack Query result for loading states |
| header              | React.ReactNode                        | undefined | Custom header content                    |
| footer              | React.ReactNode                        | undefined | Custom footer content                    |
| hideHeader          | boolean                                | false     | Hide the header section                  |
| hideFooter          | boolean                                | false     | Hide the footer section                  |
| showCloseButton     | boolean                                | true      | Show/hide close button                   |
| overlayClassName    | string                                 | ""        | Additional classes for overlay           |
| contentClassName    | string                                 | ""        | Additional classes for content           |
| closeOnOutsideClick | boolean                                | true      | Close on outside click                   |
| preventScroll       | boolean                                | true      | Prevent body scroll when open            |

## TanStack Query Integration

The dialog component seamlessly integrates with TanStack Query for data fetching:

```tsx
function UserDetailsDialog({ userId }) {
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      queryResult={userQuery}
      header="User Details"
    >
      {userQuery.data && (
        <div>
          <h2>{userQuery.data.name}</h2>
          <p>{userQuery.data.email}</p>
        </div>
      )}
    </Dialog>
  );
}
```

## Using the Dialog Context

Access dialog state from child components:

```tsx
import { useDialog } from "./components/modals/dialog";

function DialogContent() {
  const { close, isOpen, queryResult } = useDialog();

  return <button onClick={close}>Close Dialog</button>;
}
```

## Animation Variants

Three built-in animation variants:

1. **fade**: Simple opacity transition
2. **slide**: Slide up/down with fade
3. **scale**: Scale in/out with fade

Customize animations:

```tsx
<Dialog
  animation="scale"
  customTransition={{
    duration: 0.5,
    ease: "easeInOut",
  }}
>
  {/* content */}
</Dialog>
```

## Size Variants

Available size classes:

- sm: max-w-sm
- md: max-w-md
- lg: max-w-lg
- xl: max-w-xl
- full: max-w-full mx-4

```tsx
<Dialog size="lg">{/* Large dialog content */}</Dialog>
```

## Loading States

The dialog automatically handles loading states when provided with a TanStack Query result:

- Shows loading spinner during fetching
- Disables close button during fetching
- Displays error messages
- Prevents closing during data fetching

## Accessibility

Built on Headless UI, the dialog includes:

- Proper ARIA attributes
- Focus management
- Keyboard navigation (Esc to close)
- Screen reader support

## Best Practices

1. **Error Handling**:

```tsx
<Dialog
  queryResult={query}
  onClose={() => {
    if (query.isError) {
      // Handle error cleanup
    }
    handleClose();
  }}
>
  {/* content */}
</Dialog>
```

2. **Custom Loading States**:

```tsx
<Dialog
  queryResult={query}
  contentClassName={query.isLoading ? "opacity-50" : ""}
>
  {/* content */}
</Dialog>
```

3. **Responsive Design**:

```tsx
<Dialog size="full" className="md:max-w-md lg:max-w-lg">
  {/* content */}
</Dialog>
```

## Examples

### Form Dialog

```tsx
function FormDialog() {
  const mutation = useMutation({
    mutationFn: submitForm,
  });

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      header="Submit Form"
      footer={
        <button disabled={mutation.isLoading} onClick={handleSubmit}>
          {mutation.isLoading ? "Submitting..." : "Submit"}
        </button>
      }
    >
      <form>{/* form fields */}</form>
    </Dialog>
  );
}
```

### Confirmation Dialog

```tsx
function ConfirmDialog() {
  return (
    <Dialog
      size="sm"
      position="center"
      hideHeader
      footer={
        <div className="space-x-2">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      }
    >
      <p>Are you sure you want to proceed?</p>
    </Dialog>
  );
}
```
