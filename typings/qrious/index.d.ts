declare class QRious {
  constructor(options?: QRiousOptions);
  public toDataURL(mime?: string): string;
}

type CorrectionLevel = "L" | "M" | "Q" | "H";

interface QRiousOptions {
  background?: string;
  backgroundAlpha?: number;
  foreground?: string,
  foregroundAlpha?: number,
  level?: CorrectionLevel;
  padding?: number,
  size?: number,
  value?: string
}

declare module "qrious" {
  export = QRious;
}
