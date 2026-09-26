/**
 * Tipos mínimos alinhados a openapi/openapi.yaml (geração manual para o exemplo).
 */
export interface components {
  schemas: {
    Product: {
      id: string
      name: string
      price_in_cents: number
      stock: number
    }
    CartLine: {
      product_id: string
      quantity: number
      name: string
      price_in_cents: number
    }
    Cart: {
      items: components['schemas']['CartLine'][]
    }
    AddCartItem: {
      productId: string
      quantity: number
    }
  }
}

export interface paths {
  '/products/{productId}': {
    get: {
      parameters: {
        path: { productId: string }
      }
      responses: {
        200: {
          content: {
            'application/json': components['schemas']['Product']
          }
        }
        404: {
          content: never
        }
      }
    }
  }
  '/cart': {
    get: {
      responses: {
        200: {
          content: {
            'application/json': components['schemas']['Cart']
          }
        }
      }
    }
  }
  '/cart/items': {
    post: {
      requestBody: {
        content: {
          'application/json': components['schemas']['AddCartItem']
        }
      }
      responses: {
        200: {
          content: {
            'application/json': components['schemas']['Cart']
          }
        }
      }
    }
  }
}
