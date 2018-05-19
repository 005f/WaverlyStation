export function createFilter(ctx, type, cutoff, Q) {
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = cutoff
  filter.Q.value = Q

  return filter
}

export function updateFilter(ctx, filter, type, cutoff, Q) {
  filter.frequency.setValueAtTime(cutoff, ctx.currentTime)
  filter.Q.setValueAtTime(Q, ctx.currentTime)
}
