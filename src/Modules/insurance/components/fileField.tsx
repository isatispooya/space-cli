import { server } from "../../../api";
import { FileInput } from "../../../components/inputs";

const FileField: React.FC<{
  field: { id: number; name: string };
  existingFile: { file_name: number; file_attachment: string };
  filesToDelete: string[];
  handleDeleteFile: (fieldId: string) => void;
  handleFileChange: (
    fieldId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  uploadedFiles: Record<string, string>;
}> = ({
  field,
  existingFile,
  filesToDelete,
  handleDeleteFile,
  handleFileChange,
}) => (
  <div className="space-y-2">
    {existingFile && !filesToDelete.includes(field.id.toString()) ? (
      <div className="flex items-center justify-between mb-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{field.name}:</span>
          <a
            href={`${server}${existingFile.file_attachment}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline text-sm"
            onClick={(e) => {
              e.preventDefault();
              window.open(`${server}${existingFile.file_attachment}`, "_blank");
            }}
          >
            مشاهده فایل
          </a>
        </div>
        <button
          type="button"
          onClick={() => handleDeleteFile(field.id.toString())}
          className="px-3 py-1 text-sm text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded-md"
        >
          حذف
        </button>
      </div>
    ) : (
      <FileInput
        label={field.name}
        onChange={(e) => handleFileChange(field.id.toString(), e)}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />
    )}
  </div>
);

export default FileField;
