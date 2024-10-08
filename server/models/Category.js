export class Category {
  constructor(name, img_url, slug) {
    this.name = name
    this.img_url = img_url
    this.slug = slug || (name ? name.split(' ').join('-').toLowerCase() : '')
  }

  toPlainObject() {
    return {
      name: this.name,
      img_url: this.img_url,
      slug: this.slug,
    }
  }
}
