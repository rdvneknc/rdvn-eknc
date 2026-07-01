interface SectionLabelProps {
  children: string
}

const SectionLabel = ({ children }: SectionLabelProps) => (
  <p className="section-kicker">{children}</p>
)

export default SectionLabel
