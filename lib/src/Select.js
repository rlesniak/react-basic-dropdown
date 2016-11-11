'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.state = {
      value: props.value || null,
      label: null,
      isOpen: false
    };

    _this.handleShow = _this.handleShow.bind(_this);
    _this.hide = _this.hide.bind(_this);
    _this.move = _this.move.bind(_this);
    return _this;
  }

  _createClass(Select, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.move);
      document.removeEventListener('click', this.hide);
    }
  }, {
    key: 'getCurrentIndex',
    value: function getCurrentIndex() {
      return _lodash2.default.findIndex(this.props.options, { value: this.state.value });
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(item) {
      this.setState({
        value: item.value,
        label: item.label
      });

      if (this.props.onChange) {
        this.props.onChange.bind(this)(item);
      }
    }
  }, {
    key: 'scrollIntoView',
    value: function scrollIntoView() {
      if (this.activeDOMRef) {
        this.activeDOMRef.scrollIntoView();
      }
    }
  }, {
    key: 'selectNext',
    value: function selectNext() {
      var next = this.props.options[this.getCurrentIndex() + 1];

      if (next) {
        this.setState({
          value: next.value
        });
      }
    }
  }, {
    key: 'selectPrev',
    value: function selectPrev() {
      var prev = this.props.options[this.getCurrentIndex() - 1];

      if (prev) {
        this.setState({
          value: prev.value
        });
      }
    }
  }, {
    key: 'move',
    value: function move(e) {
      e.preventDefault();
      e.stopPropagation();

      this.scrollIntoView();

      switch (e.keyCode) {
        case 40:
          this.selectNext(e);
          break;
        case 38:
          this.selectPrev(e);
          break;
        case 13:
          this.hide();
          break;
        default:
      }
    }
  }, {
    key: 'handleShow',
    value: function handleShow() {
      var _this2 = this;

      if (this.props.disabled === true) {
        return;
      }

      this.setState({
        isOpen: true
      }, function () {
        _this2.scrollIntoView();
      });

      if (this.props.onOpen) {
        this.props.onOpen.call(this);
      }

      document.addEventListener('click', this.hide);
      document.addEventListener('keydown', this.move);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({
        isOpen: false
      });

      if (this.props.onClose) {
        this.props.onClose.call(this);
      }

      document.removeEventListener('click', this.hide);
      document.removeEventListener('keydown', this.move);
    }
  }, {
    key: 'renderOption',
    value: function renderOption(option, i) {
      var _this3 = this;

      if (option.disabled) {
        return null;
      }

      var value = this.state.value;

      var handleSelect = this.handleSelect.bind(this, option);
      var isSelected = value === option.value;
      var DOMReference = function DOMReference(ref) {
        if (isSelected) {
          _this3.activeDOMRef = ref;
        }
      };

      var optionClass = (0, _classnames2.default)('option', { selected: isSelected });
      return _react2.default.createElement(
        'div',
        { key: 'option-' + i, onClick: handleSelect, styleName: optionClass, ref: DOMReference },
        _react2.default.createElement(
          'span',
          null,
          option.label
        )
      );
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      if (this.props.disabled === true) {
        return null;
      }

      return this.props.options.map(this.renderOption.bind(this));
    }
  }, {
    key: 'renderLabel',
    value: function renderLabel() {
      if (!this.state.value) {
        return this.props.placeholder;
      }

      return _lodash2.default.find(this.props.options, { value: this.state.value }).label;
    }
  }, {
    key: 'render',
    value: function render() {
      var containerClass = (0, _classnames2.default)('container', {
        show: this.state.isOpen,
        disabled: this.props.disabled
      });

      return _react2.default.createElement(
        'div',
        { styleName: containerClass },
        _react2.default.createElement(
          'div',
          { styleName: 'display', onClick: this.handleShow },
          _react2.default.createElement(
            'span',
            null,
            this.renderLabel()
          )
        ),
        _react2.default.createElement(
          'div',
          { styleName: 'list' },
          _react2.default.createElement(
            'div',
            null,
            this.renderOptions()
          )
        )
      );
    }
  }]);

  return Select;
}(_react.Component);

Select.defaultProps = {
  placeholder: 'Select'
};

Select.propTypes = {
  options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string.isRequired,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
    disabled: _react.PropTypes.bool
  })).isRequired,
  value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  onChange: _react.PropTypes.func,
  onOpen: _react.PropTypes.func,
  onClose: _react.PropTypes.func,
  disabled: _react.PropTypes.bool,
  placeholder: _react.PropTypes.string
};

exports.default = (0, _reactCssModules2.default)(Select, _styles2.default, { allowMultiple: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TZWxlY3QuanN4Il0sIm5hbWVzIjpbIlNlbGVjdCIsInByb3BzIiwic3RhdGUiLCJ2YWx1ZSIsImxhYmVsIiwiaXNPcGVuIiwiaGFuZGxlU2hvdyIsImJpbmQiLCJoaWRlIiwibW92ZSIsIm5leHRQcm9wcyIsInNldFN0YXRlIiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZmluZEluZGV4Iiwib3B0aW9ucyIsIml0ZW0iLCJvbkNoYW5nZSIsImFjdGl2ZURPTVJlZiIsInNjcm9sbEludG9WaWV3IiwibmV4dCIsImdldEN1cnJlbnRJbmRleCIsInByZXYiLCJlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJrZXlDb2RlIiwic2VsZWN0TmV4dCIsInNlbGVjdFByZXYiLCJkaXNhYmxlZCIsIm9uT3BlbiIsImNhbGwiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbG9zZSIsIm9wdGlvbiIsImkiLCJoYW5kbGVTZWxlY3QiLCJpc1NlbGVjdGVkIiwiRE9NUmVmZXJlbmNlIiwicmVmIiwib3B0aW9uQ2xhc3MiLCJzZWxlY3RlZCIsIm1hcCIsInJlbmRlck9wdGlvbiIsInBsYWNlaG9sZGVyIiwiZmluZCIsImNvbnRhaW5lckNsYXNzIiwic2hvdyIsInJlbmRlckxhYmVsIiwicmVuZGVyT3B0aW9ucyIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsImFycmF5T2YiLCJzaGFwZSIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJib29sIiwiZnVuYyIsImFsbG93TXVsdGlwbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLE07OztBQUNKLGtCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsZ0hBQ1hBLEtBRFc7O0FBRWpCLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxhQUFPRixNQUFNRSxL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QixFQUdKRixVQUxzQztBQU16QzFCLGNBQVUsaUJBQVU2QjtBQU5xQixHQUFoQixDQUFsQixFQU9MSCxVQVJhO0FBU2pCcEQsU0FBTyxpQkFBVXFELFNBQVYsQ0FBb0IsQ0FDekIsaUJBQVVGLE1BRGUsRUFFekIsaUJBQVVHLE1BRmUsQ0FBcEIsQ0FUVTtBQWFqQnhDLFlBQVUsaUJBQVUwQyxJQWJIO0FBY2pCN0IsVUFBUSxpQkFBVTZCLElBZEQ7QUFlakIxQixXQUFTLGlCQUFVMEIsSUFmRjtBQWdCakI5QixZQUFVLGlCQUFVNkIsSUFoQkg7QUFpQmpCZCxlQUFhLGlCQUFVVTtBQWpCTixDQUFuQjs7a0JBb0JlLCtCQUFXdEQsTUFBWCxvQkFBMkIsRUFBRTRELGVBQWUsSUFBakIsRUFBM0IsQyIsImZpbGUiOiJTZWxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBDU1NNb2R1bGVzIGZyb20gJ3JlYWN0LWNzcy1tb2R1bGVzJ1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJ1xuaW1wb3J0IGN4IGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzLnNjc3MnXG5cbmNsYXNzIFNlbGVjdCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSB8fCBudWxsLFxuICAgICAgbGFiZWw6IG51bGwsXG4gICAgICBpc09wZW46IGZhbHNlLFxuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlU2hvdyA9IHRoaXMuaGFuZGxlU2hvdy5iaW5kKHRoaXMpXG4gICAgdGhpcy5oaWRlID0gdGhpcy5oaWRlLmJpbmQodGhpcylcbiAgICB0aGlzLm1vdmUgPSB0aGlzLm1vdmUuYmluZCh0aGlzKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLnZhbHVlICE9PSB0aGlzLnN0YXRlLnZhbHVlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IG5leHRQcm9wcy52YWx1ZSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMubW92ZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZSlcbiAgfVxuXG4gIGdldEN1cnJlbnRJbmRleCgpIHtcbiAgICByZXR1cm4gXy5maW5kSW5kZXgodGhpcy5wcm9wcy5vcHRpb25zLCB7IHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlIH0pXG4gIH1cblxuICBoYW5kbGVTZWxlY3QoaXRlbSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsXG4gICAgICBsYWJlbDogaXRlbS5sYWJlbCxcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UuYmluZCh0aGlzKShpdGVtKVxuICAgIH1cbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3KCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZURPTVJlZikge1xuICAgICAgdGhpcy5hY3RpdmVET01SZWYuc2Nyb2xsSW50b1ZpZXcoKVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdE5leHQoKSB7XG4gICAgY29uc3QgbmV4dCA9IHRoaXMucHJvcHMub3B0aW9uc1t0aGlzLmdldEN1cnJlbnRJbmRleCgpICsgMV1cblxuICAgIGlmIChuZXh0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IG5leHQudmFsdWUsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFByZXYoKSB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMucHJvcHMub3B0aW9uc1t0aGlzLmdldEN1cnJlbnRJbmRleCgpIC0gMV1cblxuICAgIGlmIChwcmV2KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdmFsdWU6IHByZXYudmFsdWUsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG1vdmUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKVxuXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHRoaXMuc2VsZWN0TmV4dChlKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAzODpcbiAgICAgICAgdGhpcy5zZWxlY3RQcmV2KGUpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDEzOlxuICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICBoYW5kbGVTaG93KCkge1xuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGlzT3BlbjogdHJ1ZSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbEludG9WaWV3KClcbiAgICB9KVxuXG4gICAgaWYgKHRoaXMucHJvcHMub25PcGVuKSB7XG4gICAgICB0aGlzLnByb3BzLm9uT3Blbi5jYWxsKHRoaXMpXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMubW92ZSlcbiAgfVxuXG4gIGhpZGUoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc09wZW46IGZhbHNlLFxuICAgIH0pXG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsb3NlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2xvc2UuY2FsbCh0aGlzKVxuICAgIH1cblxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm1vdmUpXG4gIH1cblxuICByZW5kZXJPcHRpb24ob3B0aW9uLCBpKSB7XG4gICAgaWYgKG9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdGhpcy5oYW5kbGVTZWxlY3QuYmluZCh0aGlzLCBvcHRpb24pXG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IHZhbHVlID09PSBvcHRpb24udmFsdWVcbiAgICBjb25zdCBET01SZWZlcmVuY2UgPSAocmVmKSA9PiB7XG4gICAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLmFjdGl2ZURPTVJlZiA9IHJlZlxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbkNsYXNzID0gY3goJ29wdGlvbicsIHsgc2VsZWN0ZWQ6IGlzU2VsZWN0ZWQgfSlcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBrZXk9e2BvcHRpb24tJHtpfWB9IG9uQ2xpY2s9e2hhbmRsZVNlbGVjdH0gc3R5bGVOYW1lPXtvcHRpb25DbGFzc30gcmVmPXtET01SZWZlcmVuY2V9PlxuICAgICAgICA8c3Bhbj57b3B0aW9uLmxhYmVsfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIHJlbmRlck9wdGlvbnMoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucHJvcHMub3B0aW9ucy5tYXAodGhpcy5yZW5kZXJPcHRpb24uYmluZCh0aGlzKSlcbiAgfVxuXG4gIHJlbmRlckxhYmVsKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS52YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMucGxhY2Vob2xkZXJcbiAgICB9XG5cbiAgICByZXR1cm4gXy5maW5kKHRoaXMucHJvcHMub3B0aW9ucywgeyB2YWx1ZTogdGhpcy5zdGF0ZS52YWx1ZSB9KS5sYWJlbFxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzID0gY3goJ2NvbnRhaW5lcicsIHtcbiAgICAgIHNob3c6IHRoaXMuc3RhdGUuaXNPcGVuLFxuICAgICAgZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgfSlcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlTmFtZT17Y29udGFpbmVyQ2xhc3N9PlxuICAgICAgICA8ZGl2IHN0eWxlTmFtZT1cImRpc3BsYXlcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVNob3d9PlxuICAgICAgICAgIDxzcGFuPnt0aGlzLnJlbmRlckxhYmVsKCl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZU5hbWU9XCJsaXN0XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlck9wdGlvbnMoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgcGxhY2Vob2xkZXI6ICdTZWxlY3QnLFxufVxuXG5TZWxlY3QucHJvcFR5cGVzID0ge1xuICBvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5udW1iZXIsXG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIH0pKS5pc1JlcXVpcmVkLFxuICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICBQcm9wVHlwZXMubnVtYmVyLFxuICBdKSxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBvbk9wZW46IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ1NTTW9kdWxlcyhTZWxlY3QsIHN0eWxlcywgeyBhbGxvd011bHRpcGxlOiB0cnVlIH0pXG4iXX0=