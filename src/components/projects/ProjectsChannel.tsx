import { useState } from 'react'
import ProjectsCategorySelect from './ProjectsCategorySelect'
import ProjectsGridScreen from './ProjectsGridScreen'

type Category = 'product-growth' | 'side-projects'

interface Props {
  onBack: () => void
}

export default function ProjectsChannel({ onBack }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  if (selectedCategory) {
    return (
      <ProjectsGridScreen
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    )
  }

  return (
    <ProjectsCategorySelect
      onBack={onBack}
      onCategorySelect={(id) => setSelectedCategory(id as Category)}
    />
  )
}
