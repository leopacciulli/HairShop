interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'equipe@jonasemarcia.com.br', // colocar o email configurado no Email Addresses no Amazon SES
      name: 'Jonas e Márcia',
    },
  },
} as IMailConfig;
