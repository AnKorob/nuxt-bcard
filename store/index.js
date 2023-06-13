// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
export const state = () => ({
  clientCompany: null,
  oppositeCompany: {
    full_name: "Общество с ограниченной ответственностью 'Рога и Копыта'",
    short_name: 'ООО "Рога и Копыта"',
    manager: 'Ген. директор',
    ceo: 'Сергеев Сергей Сергеевич',
    inn: '6601234567',
    kpp: '660123456',
    ogrn: '1234567890123',
    address: 'г.Москва ул.Пушкина д.1',
    full_address: 'г.Москва ул.Пушкина д.1 п.123',
    type: 'LEGAL',
  },
  oppositeBank: {
    name: 'Банк джедаев',
    correspondent_account: '11223344556677889900',
    bik: '123456789',
    account: '',
  },
  clientBank: {
    name: '',
    correspondent_account: '',
    bik: '',
    account: '',
  },
  companiesTabs: [],
})
export const getters = {
  getClientBankRows: (state) => {
    if (!state.clientBank) return []

    return [
      {
        key: 'account',
        label: 'Счет',
        input: {
          placeholder: 'Введите номер банковского счета',
        },
      },
      {
        key: 'bik',
        label: 'БИК',
        input: {
          placeholder: 'Введите БИК',
        },
      },
      {
        key: 'bank_name',
        label: 'Наименование Банка',
        value: state.clientBank.name,
      },
      {
        key: 'korr_account',
        label: 'Корр. счет',
        value: state.clientBank.correspondent_account,
      },
    ]
  },
  getClientCompanyTableRows: (state) => {
    if (!state.clientCompany) return []
    return [
      {
        key: 'full_name',
        label: 'Полное наименование',
        value: state.clientCompany.full_name,
      },
      {
        key: 'short_name',
        label: 'Краткое наименование',
        value: state.clientCompany.short_name,
      },
      {
        key: 'ceo',
        label: state.clientCompany?.manager || null,
        value: state.clientCompany?.ceo,
      },
      {
        key: 'inn',
        label: 'ИНН',
        value: state.clientCompany.inn,
      },
      {
        key: 'kpp',
        label: 'КПП',
        value: state.clientCompany.kpp,
      },
      {
        key: 'ogrn',
        label: 'ОГРН',
        value: state.clientCompany.ogrn,
      },
      {
        key: 'okpo',
        label: 'ОКПО',
        value: state.clientCompany.okpo,
      },
      {
        key: 'address',
        label: 'Юридический Адрес',
        value: state.clientCompany.address,
      },
    ]
  },
}
export const mutations = {
  SET_COMPANY_TAB(state, tab) {
    const isExist = state.companiesTabs.find(
      (cTab) => cTab.hash === tab.hash || cTab.title === tab.title
    )
    if (!isExist) {
      state.companiesTabs.push(tab)
      localStorage.setItem('usedTabs', JSON.stringify(state.companiesTabs))
    }
  },
  SET_COMPANY_TABS(state) {
    state.companiesTabs = JSON.parse(localStorage.getItem('usedTabs')) ?? []
  },
  SET_OPPOSITE_COMPANY(state, company) {
    state.oppositeCompany = {
      full_name: company.data.name.full_with_opf,
      short_name: company.value,
      manager:
        company.data.management?.post?.[0].toUpperCase() +
        company.data.management?.post?.slice(1).toLowerCase(),
      ceo: company.data.management?.name || company.data.name.full,
      inn: company.data.inn,
      kpp: company.data.kpp,
      ogrn: company.data.ogrn,
      address: company.data.address.value,
      full_address: company.data.address.unrestricted_value,
      type: company.data.type,
    }
  },
  SET_CLIENT_COMPANY(state, [company, hash]) {
    state.clientCompany = {
      hash,
      full_name: company.data.name.full_with_opf,
      short_name: company.value,
      manager:
        company.data.management?.post?.[0].toUpperCase() +
        company.data.management?.post?.slice(1).toLowerCase(),
      ceo: company.data.management?.name || company.data.name.full,
      inn: company.data.inn,
      kpp: company.data.kpp,
      ogrn: company.data.ogrn,
      address: company.data.address.value,
      okpo: company.data.okpo,
      type: company.data.type,
    }
  },
  SET_CLIENT_BANK(state, data) {
    state.clientBank.name = data.name.short
    state.clientBank.correspondent_account = data.correspondent_account
    state.clientBank.bik = data.bic
  },

  SET_CLIENT_BANK_ACCOUNT(state, account) {
    state.clientBank.account = account
  },
  SET_OPPOSITE_BANK_ACCOUNT(state, account) {
    state.oppositeBank.account = account
  },

  SET_OPPOSITE_BANK(state, data) {
    state.oppositeBank.name = data.name.short
    state.oppositeBank.correspondent_account = data.correspondent_account
    state.oppositeBank.bik = data.bic
  },

  CLEAR_OPPOSITE_COMPANY(state) {
    state.oppositeCompany = {
      full_name: "Общество с ограниченной ответственностью 'Рога и Копыта'",
      short_name: 'ООО "Рога и Копыта"',
      manager: 'Ген. директор',
      ceo: 'Сергеев Сергей Сергеевич',
      inn: '6601234567',
      kpp: '660123456',
      ogrn: '1234567890123',
      address: 'г.Москва ул.Пушкина д.1',
      full_address: 'г.Москва ул.Пушкина д.1 п.123',
      type: 'LEGAL',
    }
  },
  CLEAR_OPPOSITE_BANK(state) {
    state.oppositeBank.name = 'Банк джедаев'
    state.oppositeBank.correspondent_account = '11223344556677889900'
    state.oppositeBank.bik = '123456789'
  },
}
export const actions = {
  fetchCompanyByHash({ commit }, hash) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/', {
          action: 'bcard:company',
          hash: `${hash}`,
        })
        .then((response) => {
          if (response.data.result === 'error')
            throw new Error(response.data.data.message)
          if (!response.data.data.company.suggestions?.length)
            throw new Error('Что-то пошло не так')
          commit('SET_CLIENT_COMPANY', [
            response.data.data.company.suggestions[0],
            hash,
          ])
          resolve()
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  getCompanyByInn({ commit }, companyInn) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/', {
          action: 'bcard:company:search',
          inn: companyInn,
        })
        .then((response) => {
          if (response.data.result === 'error')
            throw new Error(response.data.data.message)
          if (!response.data.data.company.suggestions?.length)
            throw new Error('Что-то пошло не так')
          commit('SET_CLIENT_COMPANY', [
            response.data.data.company.suggestions[0],
            response.data.data.hash,
          ])
          resolve()
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  getOppositeCompanyByInn(_, inn) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/', {
          action: 'bcard:company:search',
          inn,
        })
        .then((response) => {
          if (response.data.result === 'error')
            throw new Error(response.data.data.message)
          if (!response.data.data.company.suggestions?.length)
            throw new Error('Что-то пошло не так')
          resolve(response.data.data.company.suggestions[0])
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  getBankByBik({ commit }, companyBik) {
    this.$axios
      .post('/', {
        action: 'bcard:bank:bik',
        bik: companyBik,
      })
      .then((response) => {
        commit('SET_CLIENT_BANK', response.data.data.bank.suggestions[0].data)
      })
  },
  getOppositeBankByBik(_, bik) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/', {
          action: 'bcard:bank:bik',
          bik,
        })
        .then((response) => {
          resolve(response.data.data.bank.suggestions[0].data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  getPdf(_, hash) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/?action=get-bcard-pdf&hash=${hash}`)
        .then(() => {
          window.location = 'https://itillect.ru/bcard-load/' + hash + '/'
          resolve()
        })
        .catch((e) => reject(e))
    })
  },
  getWord(_, hash) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/?action=get-bcard-word&hash=${hash}`)
        .then(() => {
          window.location = 'https://itillect.ru/bcard-load/' + hash + '/word/'
          resolve()
        })
        .catch((e) => reject(e))
    })
  },
  sendMail(_, email) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/?action=get-bcard-mail&email=${email}`)
        .then(() => {
          // window.location = 'https://itillect.ru/bcard-load/' + hash + '/'
          resolve()
        })
        .catch((e) => reject(e))
    })
  },
}
// export default {
//   state: {
//     clientCompany: null,
//     oppositeCompany: {
//       full_name: "Общество с ограниченной ответственностью 'Рога и Копыта'",
//       short_name: 'ООО "Рога и Копыта"',
//       manager: 'Ген. директор',
//       ceo: 'Сергеев Сергей Сергеевич',
//       inn: '6601234567',
//       kpp: '660123456',
//       ogrn: '1234567890123',
//       address: 'г.Москва ул.Пушкина д.1',
//       full_address: 'г.Москва ул.Пушкина д.1 п.123',
//       type: 'LEGAL',
//     },
//     oppositeBank: {
//       name: 'Банк джедаев',
//       correspondent_account: '11223344556677889900',
//       bik: '123456789',
//       account: '',
//     },
//     clientBank: {
//       name: '',
//       correspondent_account: '',
//       bik: '',
//       account: '',
//     },
//     companiesTabs: [],
//   },
//   getters: {
//     getClientBankRows: (state) => {
//       if (!state.clientBank) return []

//       return [
//         {
//           key: 'account',
//           label: 'Счет',
//           input: {
//             placeholder: 'Введите номер банковского счета',
//           },
//         },
//         {
//           key: 'bik',
//           label: 'БИК',
//           input: {
//             placeholder: 'Введите БИК',
//           },
//         },
//         {
//           key: 'bank_name',
//           label: 'Наименование Банка',
//           value: state.clientBank.name,
//         },
//         {
//           key: 'korr_account',
//           label: 'Корр. счет',
//           value: state.clientBank.correspondent_account,
//         },
//       ]
//     },
//     getClientCompanyTableRows: (state) => {
//       if (!state.clientCompany) return []
//       return [
//         {
//           key: 'full_name',
//           label: 'Полное наименование',
//           value: state.clientCompany.full_name,
//         },
//         {
//           key: 'short_name',
//           label: 'Краткое наименование',
//           value: state.clientCompany.short_name,
//         },
//         {
//           key: 'ceo',
//           label: state.clientCompany?.manager || null,
//           value: state.clientCompany?.ceo,
//         },
//         {
//           key: 'inn',
//           label: 'ИНН',
//           value: state.clientCompany.inn,
//         },
//         {
//           key: 'kpp',
//           label: 'КПП',
//           value: state.clientCompany.kpp,
//         },
//         {
//           key: 'ogrn',
//           label: 'ОГРН',
//           value: state.clientCompany.ogrn,
//         },
//         {
//           key: 'okpo',
//           label: 'ОКПО',
//           value: state.clientCompany.okpo,
//         },
//         {
//           key: 'address',
//           label: 'Юридический Адрес',
//           value: state.clientCompany.address,
//         },
//       ]
//     },
//   },
//   mutations: {
//     SET_COMPANY_TAB(state, tab) {
//       const isExist = state.companiesTabs.find(
//         (cTab) => cTab.hash === tab.hash || cTab.title === tab.title
//       )
//       if (!isExist) {
//         state.companiesTabs.push(tab)
//         localStorage.setItem('usedTabs', JSON.stringify(state.companiesTabs))
//       }
//     },
//     SET_COMPANY_TABS(state) {
//       state.companiesTabs = JSON.parse(localStorage.getItem('usedTabs')) ?? []
//     },
//     SET_OPPOSITE_COMPANY(state, company) {
//       state.oppositeCompany = {
//         full_name: company.data.name.full_with_opf,
//         short_name: company.value,
//         manager:
//           company.data.management?.post?.[0].toUpperCase() +
//           company.data.management?.post?.slice(1).toLowerCase(),
//         ceo: company.data.management?.name || company.data.name.full,
//         inn: company.data.inn,
//         kpp: company.data.kpp,
//         ogrn: company.data.ogrn,
//         address: company.data.address.value,
//         full_address: company.data.address.unrestricted_value,
//         type: company.data.type,
//       }
//     },
//     SET_CLIENT_COMPANY(state, [company, hash]) {
//       state.clientCompany = {
//         hash,
//         full_name: company.data.name.full_with_opf,
//         short_name: company.value,
//         manager:
//           company.data.management?.post?.[0].toUpperCase() +
//           company.data.management?.post?.slice(1).toLowerCase(),
//         ceo: company.data.management?.name || company.data.name.full,
//         inn: company.data.inn,
//         kpp: company.data.kpp,
//         ogrn: company.data.ogrn,
//         address: company.data.address.value,
//         okpo: company.data.okpo,
//         type: company.data.type,
//       }
//     },
//     SET_CLIENT_BANK(state, data) {
//       state.clientBank.name = data.name.short
//       state.clientBank.correspondent_account = data.correspondent_account
//       state.clientBank.bik = data.bic
//     },

//     SET_CLIENT_BANK_ACCOUNT(state, account) {
//       state.clientBank.account = account
//     },
//     SET_OPPOSITE_BANK_ACCOUNT(state, account) {
//       state.oppositeBank.account = account
//     },

//     SET_OPPOSITE_BANK(state, data) {
//       state.oppositeBank.name = data.name.short
//       state.oppositeBank.correspondent_account = data.correspondent_account
//       state.oppositeBank.bik = data.bic
//     },

//     CLEAR_OPPOSITE_COMPANY(state) {
//       state.oppositeCompany = {
//         full_name: "Общество с ограниченной ответственностью 'Рога и Копыта'",
//         short_name: 'ООО "Рога и Копыта"',
//         manager: 'Ген. директор',
//         ceo: 'Сергеев Сергей Сергеевич',
//         inn: '6601234567',
//         kpp: '660123456',
//         ogrn: '1234567890123',
//         address: 'г.Москва ул.Пушкина д.1',
//         full_address: 'г.Москва ул.Пушкина д.1 п.123',
//         type: 'LEGAL',
//       }
//     },
//     CLEAR_OPPOSITE_BANK(state) {
//       state.oppositeBank.name = 'Банк джедаев'
//       state.oppositeBank.correspondent_account = '11223344556677889900'
//       state.oppositeBank.bik = '123456789'
//     },
//   },
//   actions: {
//     fetchCompanyByHash({ commit }, hash) {
//       return new Promise((resolve, reject) => {
//         this.$axios
//           .post('/', {
//             action: 'bcard:company',
//             hash: `${hash}`,
//           })
//           .then((response) => {
//             if (response.data.result === 'error')
//               throw new Error(response.data.data.message)
//             if (!response.data.data.company.suggestions?.length)
//               throw new Error('Что-то пошло не так')
//             commit('SET_CLIENT_COMPANY', [
//               response.data.data.company.suggestions[0],
//               hash,
//             ])
//             resolve()
//           })
//           .catch((e) => {
//             reject(e)
//           })
//       })
//     },
//     getCompanyByInn({ commit }, companyInn) {
//       return new Promise((resolve, reject) => {
//         this.$axios
//           .post('/', {
//             action: 'bcard:company:search',
//             inn: companyInn,
//           })
//           .then((response) => {
//             if (response.data.result === 'error')
//               throw new Error(response.data.data.message)
//             if (!response.data.data.company.suggestions?.length)
//               throw new Error('Что-то пошло не так')
//             commit('SET_CLIENT_COMPANY', [
//               response.data.data.company.suggestions[0],
//               response.data.data.hash,
//             ])
//             resolve()
//           })
//           .catch((e) => {
//             reject(e)
//           })
//       })
//     },
//     getOppositeCompanyByInn(_, inn) {
//       return new Promise((resolve, reject) => {
//         this.$axios
//           .post('/', {
//             action: 'bcard:company:search',
//             inn,
//           })
//           .then((response) => {
//             if (response.data.result === 'error')
//               throw new Error(response.data.data.message)
//             if (!response.data.data.company.suggestions?.length)
//               throw new Error('Что-то пошло не так')
//             resolve(response.data.data.company.suggestions[0])
//           })
//           .catch((e) => {
//             reject(e)
//           })
//       })
//     },
//     getBankByBik({ commit }, companyBik) {
//       this.$axios
//         .post('/', {
//           action: 'bcard:bank:bik',
//           bik: companyBik,
//         })
//         .then((response) => {
//           commit('SET_CLIENT_BANK', response.data.data.bank.suggestions[0].data)
//         })
//     },
//     getOppositeBankByBik(_, bik) {
//       return new Promise((resolve, reject) => {
//         this.$axios
//           .post('/', {
//             action: 'bcard:bank:bik',
//             bik,
//           })
//           .then((response) => {
//             resolve(response.data.data.bank.suggestions[0].data)
//           })
//           .catch((e) => {
//             reject(e)
//           })
//       })
//     },
//     getPdf(_, hash) {
//       return new Promise((resolve, reject) => {
//         this.$axios
//           .get(`/?action=get-bcard-pdf&hash=${hash}`)
//           .then(() => {
//             window.location = 'https://itillect.ru/bcard-load/' + hash + '/'
//             resolve()
//           })
//           .catch((e) => reject(e))
//       })
//     },
//     getWord(_, hash) {
//       return new Promise((resolve, reject) => {
//         this.$axios
//           .get(`/?action=get-bcard-word&hash=${hash}`)
//           .then(() => {
//             window.location =
//               'https://itillect.ru/bcard-load/' + hash + '/word/'
//             resolve()
//           })
//           .catch((e) => reject(e))
//       })
//     },
//     sendMail(_, email) {
//       return new Promise((resolve, reject) => {
//         this.$axios
//           .get(`/?action=get-bcard-mail&email=${email}`)
//           .then(() => {
//             resolve()
//           })
//           .catch((e) => reject(e))
//       })
//     },
//   },
// }
