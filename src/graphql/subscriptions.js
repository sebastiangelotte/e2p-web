/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    courses {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    courses {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    courses {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const onCreateCourse = `subscription OnCreateCourse {
  onCreateCourse {
    id
    blog {
      id
      courses {
        nextToken
      }
    }
  }
}
`;
export const onUpdateCourse = `subscription OnUpdateCourse {
  onUpdateCourse {
    id
    blog {
      id
      courses {
        nextToken
      }
    }
  }
}
`;
export const onDeleteCourse = `subscription OnDeleteCourse {
  onDeleteCourse {
    id
    blog {
      id
      courses {
        nextToken
      }
    }
  }
}
`;
