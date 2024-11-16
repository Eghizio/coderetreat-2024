require 'minitest/autorun'

class NotNumberError < StandardError; end

module Logger
  def self.log(message)
    puts message
  end
end

def calculate(x, y)
    
  unless x.is_a?(Numeric) # && !x.nan?
    raise NotNumberError, "x is not a number or is NaN. x: #{x.class} = #{x.inspect}"
  end

  unless y.is_a?(Numeric) #&& !y.nan?
    raise NotNumberError, "y is not a number or is NaN. y: #{y.class} = #{y.inspect}"
  end

  Logger.log("Calculating for (x, y) = (#{x}, #{y})...")
  x + y
end

class TestCalculate < Minitest::Test
  @@invalid_values = [
    "42",
    "",
    "foo",
    # Float::NAN,
    true,
    # nil,
    {},
    [],
    -> {}
  ]

  @@results = [
    [42, 2, 44],
    [42, -2, 40],
    [-42, 42, 0],
    [-42, -2, -44],
    [0, 0, 0]
  ]

  def setup
    @log_mock = Minitest::Mock.new
    Logger.singleton_class.define_method(:log) do |message|
      @log_mock.call(message)
    end
  end

  def teardown
    Logger.singleton_class.remove_method(:log)
  end

#   def test_invalid_x
#     y = 42
#     @@invalid_values.each do |x|
#       error = assert_raises(NotNumberError) { calculate(x, y) }
#       assert_match(/x is not a number or is NaN/, error.message)
#     end
#   end

#   def test_invalid_y
#     x = 42
#     @@invalid_values.each do |y|
#       error = assert_raises(NotNumberError) { calculate(x, y) }
#       assert_match(/y is not a number or is NaN/, error.message)
#     end
#   end

#   def test_valid_inputs
#     @@results.each do |x, y, expected|
#       assert_equal expected, calculate(x, y)
#     end
#   end

  def test_logger_called
    @@results.each do |x, y|
      @log_mock.expect :call, nil, ["Calculating for (x, y) = (#{x}, #{y})..."]
      calculate(x, y)
      @log_mock.verify
    end
  end
end
