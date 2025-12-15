import {defineField, defineType, defineArrayMember} from 'sanity'
import {supportedLanguages} from '../languages'

const createLocalizedField = (name: string, type: string, title: string, options?: any) => ({
  name: name,
  title: title,
  type: 'object',
  // Array of fields, one for each language
  fields: supportedLanguages.map((lang) =>
    defineField({
      name: lang.id, // 'en', 'es', 'fr'
      title: lang.title, // 'English', 'Spanish', 'French'
      type: type,
      validation: (Rule: any) => (lang.isDefault ? Rule.required() : Rule),
      ...options,
    }),
  ),
})

//  Main Post Schema
export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // 1. Localized Title Field
    createLocalizedField('title', 'string', 'Title'),

    // 2. Slug remains non-localized, but sources the default language title
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // 3. Published At (Non-Localized)
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    // 4. Image (Non-Localized)
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    {
      name: 'body',
      title: 'Body Content',
      type: 'object',
      fields: supportedLanguages.map((lang) =>
        defineField({
          name: lang.id, // 'en', 'es', 'fr'
          title: lang.title,
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
            }),
          ],
          validation: (Rule) => (lang.isDefault ? Rule.required() : Rule),
        }),
      ),
    },
  ],
})
