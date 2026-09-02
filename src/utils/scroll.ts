/**
 * Scrolls to a section by id, offsetting for the fixed navbar's actual
 * measured height (not a guessed constant) so the section heading lands
 * just below the nav instead of the target being hidden under it or the
 * scroll overshooting into the whitespace below.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (!el) return

  const nav = document.querySelector('nav')
  const navHeight = nav ? nav.getBoundingClientRect().height : 0
  const breathingRoom = 16

  const top = el.getBoundingClientRect().top + window.scrollY - navHeight - breathingRoom
  window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' })
}
