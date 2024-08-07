import {ChangeEvent, useState, useCallback, useMemo} from 'react';
import Hover from '../../shared/animations/Hover';
import './main.scss';
import {PreLoader} from '../../shared/ui/Loader';
import {
  ArrowRight,
  ChevronsRight,
  Download,
  FileWarning,
  RefreshCcw,
  Upload,
} from 'lucide-react';
import FadeIn from '../../shared/animations/FadeIn';

const Main: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(true);

  const isDisabled = useMemo(() => !file, [file]);

  const reset = useCallback(() => {
    setFile(null);
    setError(false);
    setFileUrl(null);
    setLoading(false);
    setOpenForm(true);
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) setError(false);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      setOpenForm(false);

      try {
        const response = await fetch('http://localhost:4200/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setFileUrl(url);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(true);
      } finally {
        setLoading(false);
        if (error) {
          setOpenForm(true);
          setFile(null);
        }
      }
    },
    [file, error],
  );

  return (
    <div className='main'>
      <h2>Word to PDF Converter</h2>
      {openForm && (
        <FadeIn>
          <form className='main__form' onSubmit={handleSubmit}>
            <label htmlFor='fileId'>
              <Hover scale={1.02}>
                <div className='main__form--upload'>
                  <Upload className='upload__icon' />
                  <p>{file ? 'Change File' : 'Upload File'}</p>
                </div>
              </Hover>
              {file && (
                <FadeIn>
                  <p>{file.name}</p>
                </FadeIn>
              )}
            </label>
            <input
              type='file'
              id='fileId'
              accept='.doc,.docx'
              onChange={handleChange}
            />
            {file && (
              <Hover scale={1.08}>
                <button type='submit' disabled={isDisabled}>
                  Convert <ChevronsRight className='chevrons__icon' size={25} />
                </button>
              </Hover>
            )}
          </form>
        </FadeIn>
      )}

      {error && (
        <p className='error'>
          <FileWarning size={20} /> Something went wrong
        </p>
      )}

      {loading ? (
        <PreLoader
          title={{text: 'Converting...', size: 's'}}
          size={25}
          ceneter={false}
          sub={false}
        />
      ) : fileUrl ? (
        <div className='main__download'>
          <FadeIn>
            <div className='main__download--res'>
              <p>
                File converted
                <ArrowRight className='arrow__icon' size={20} />
              </p>
              <Hover scale={1.05}>
                <a href={fileUrl} download>
                  <Download className='download__icon' /> Download
                </a>
              </Hover>
            </div>
          </FadeIn>
        </div>
      ) : null}

      {!openForm && !loading && (
        <Hover scale={1.05}>
          <button className='main__download--reset' onClick={reset}>
            <RefreshCcw className='refresh__icon' size={20} /> One more?
          </button>
        </Hover>
      )}
    </div>
  );
};

export default Main;
