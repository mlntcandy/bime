export class Bime {
  // https://discord.com/channels/574720535888396288/1071784467036913664/1397967999394386042
  static EPOCH = 1753371681447n;

  static NS_PER_SIBIBEC = 1318359375n;
  static MS_PER_SIBIBEC_APPROX = Number(this.NS_PER_SIBIBEC) / 1_000_000;

  sibibec: bigint;

  private constructor(sibibec: bigint) {
    this.sibibec = sibibec;
  }
  static fromDate(date: Date) {
    const nsSinceEpoch = (BigInt(date.getTime()) - this.EPOCH) * 1_000_000n;
    const sibibec = nsSinceEpoch / this.NS_PER_SIBIBEC;
    return new this(sibibec);
  }
  timeAsComponents(): BimeComponents {
    const t = this.sibibec;
    return {
      sibibecond: Number(t & 0xfn),
      becond: Number((t & 0xf0n) >> 4n),
      binute: Number((t & 0xf00n) >> 8n),
      bour: Number((t & 0xf000n) >> 12n),
      daySinceEpoch: Number(t >> 16n),
    };
  }
}

export type BimeComponents = {
  sibibecond: number;
  becond: number;
  binute: number;
  bour: number;
  daySinceEpoch: number;
};
