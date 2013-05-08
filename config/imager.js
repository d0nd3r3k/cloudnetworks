module.exports = {
  variants: {
    article: {
      resize: {
        detail: "x440"
      },
      resizeAndCrop: {
        mini: {resize: "63504@", crop: "252x210"}
      }
    },
    gallery: {
      crop: {
        thumb: "100x100"
      }
    }
  },

  storage: {
    S3: {
      key: 'AKIAIE36XLVPBOCNNAUQ',
      secret: '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',
      bucket: 'cloudnetworks'
    }
  },

  debug: true
}
