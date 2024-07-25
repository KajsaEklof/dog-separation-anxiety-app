
export default function useFormValidation() {
  const rules = {
    required: (value: string) => !!value || 'Field is required',
  };

  return { rules };
}