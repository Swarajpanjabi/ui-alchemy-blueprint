
import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload as UploadIcon, Camera, FileImage, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    status: 'live' | 'spoof';
    confidence: number;
    artifacts?: string[];
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = useCallback((uploadedFile: File) => {
    setFile(uploadedFile);
    setResult(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFileUpload(droppedFile);
    }
  }, [handleFileUpload]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  const processDetection = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      // Mock result - in real app, this would come from your API
      const mockResult = Math.random() > 0.3 ? {
        status: 'live' as const,
        confidence: 95.8 + Math.random() * 4,
      } : {
        status: 'spoof' as const,
        confidence: 87.2 + Math.random() * 8,
        artifacts: ['Printed texture detected', 'Unnatural reflection patterns'],
      };
      
      setResult(mockResult);
      setIsProcessing(false);
      setProgress(0);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload & Detection</h1>
        <p className="text-muted-foreground">
          Upload iris images or video frames for liveness detection analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>
              Drag and drop an iris image or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
              
              {file ? (
                <div className="space-y-4">
                  <FileImage className="h-12 w-12 mx-auto text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <UploadIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium">Upload Image</p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <Button
                onClick={processDetection}
                disabled={!file || isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : 'Detect Liveness'}
              </Button>

              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    Analyzing iris patterns... {Math.round(progress)}%
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detection Result</CardTitle>
            <CardDescription>
              Analysis results will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  {result.status === 'live' ? (
                    <>
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                      <Badge variant="default" className="text-lg px-4 py-2">
                        LIVE IRIS DETECTED
                      </Badge>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
                      <Badge variant="destructive" className="text-lg px-4 py-2">
                        SPOOF DETECTED
                      </Badge>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                      {result.confidence.toFixed(1)}% Confidence
                    </p>
                    <Progress value={result.confidence} className="w-full" />
                  </div>
                </div>

                {result.artifacts && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Detected Artifacts:</strong>
                      <ul className="mt-2 list-disc list-inside text-sm">
                        {result.artifacts.map((artifact, index) => (
                          <li key={index}>{artifact}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <Camera className="h-12 w-12 mx-auto mb-4" />
                <p>Upload an image to see detection results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
