export type Dictionary = {
  "version": "0.1.0",
  "name": "dictionary",
  "instructions": [
    {
      "name": "createEntry",
      "accounts": [
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "keyword",
          "type": "string"
        },
        {
          "name": "tokenType",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "uses",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "entry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "keyword",
            "type": "string"
          },
          {
            "name": "tokentype",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "uses",
            "type": "string"
          },
          {
            "name": "contributor",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: Dictionary = {
  "version": "0.1.0",
  "name": "dictionary",
  "instructions": [
    {
      "name": "createEntry",
      "accounts": [
        {
          "name": "entry",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "keyword",
          "type": "string"
        },
        {
          "name": "tokenType",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "uses",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "entry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "keyword",
            "type": "string"
          },
          {
            "name": "tokentype",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "uses",
            "type": "string"
          },
          {
            "name": "contributor",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
