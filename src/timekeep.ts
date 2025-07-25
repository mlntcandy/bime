export class Bime {
  // https://discord.com/channels/574720535888396288/1071784467036913664/1397967999394386042
  static EPOCH = 1753371681447n;

  static NS_PER_SIBISEC = 1318359375n;
  static MS_PER_SIBISEC_APPROX = Number(this.NS_PER_SIBISEC) / 1_000_000;

  sibisec: bigint;

  private constructor(sibisec: bigint) {
    this.sibisec = sibisec;
  }
  static fromDate(date: Date) {
    const nsSinceEpoch = (BigInt(date.getTime()) - this.EPOCH) * 1_000_000n;
    const sibisec = nsSinceEpoch / this.NS_PER_SIBISEC;
    return new this(sibisec);
  }
  toDate() {
    const nsSinceEpoch = this.sibisec * Bime.NS_PER_SIBISEC;
    const ms = Bime.EPOCH + nsSinceEpoch / 1_000_000n;
    return new Date(Number(ms));
  }
  timeAsComponents(): BimeComponents {
    const t = this.sibisec;
    return {
      sibisecond: Number(t & 0xfn),
      becond: Number((t & 0xf0n) >> 4n),
      binute: Number((t & 0xf00n) >> 8n),
      bour: Number((t & 0xf000n) >> 12n),
      daySinceEpoch: Number(t >> 16n),
    };
  }
}

export type BimeComponents = {
  sibisecond: number;
  becond: number;
  binute: number;
  bour: number;
  daySinceEpoch: number;
};
